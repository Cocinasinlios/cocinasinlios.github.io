from __future__ import annotations

from pathlib import Path
from urllib.parse import urlsplit
import re
import sys
import json

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_EXT = {".html", ".js", ".css", ".xml", ".json", ".jsonc"}
FORBIDDEN = [
    "Ther" + "momix",
    "TM" + "7",
    "Vor" + "werk",
    "thermomix" + "sinlios",
    "agente " + "comercial",
]
CORE = [
    "index.html",
    "que-cocino.html",
    "plan-semana.html",
    "recetas.html",
    "despensa-sin-lios.html",
    "mi-rincon.html",
    "con-macarena.html",
    "aviso-legal.html",
    "privacidad.html",
    "cookies.html",
    "uso-y-propiedad.html",
    "cenas-rapidas.html",
    "recetas-aprovechamiento.html",
    "cenas-ligeras.html",
    "que-cocinar-con-huevos.html",
    "recetas-con-tomate.html",
    "recetas-con-calabacin.html",
    "recetas-con-pollo.html",
    "recetas-con-arroz.html",
    "semana-sin-lios.html",
    "cenas-sin-ganas-de-cocinar.html",
    "cenas-en-15-minutos.html",
    "cenas-de-despensa.html",
    "cocinar-una-vez-comer-dos-dias.html",
    "que-hacer-con-pollo-cocido.html",
    "que-hacer-con-garbanzos-cocidos.html",
    "que-cenar-hoy.html",
    "criterio-editorial.html",
    "como-guardar-sobras.html",
]

problems: list[str] = []
warnings: list[str] = []

def html_target(raw: str) -> Path | None:
    if not raw.startswith("/") or raw.startswith("//"):
        return None
    path = urlsplit(raw).path
    if path == "/":
        return ROOT / "index.html"
    candidate = ROOT / path.lstrip("/")
    if path.endswith("/"):
        candidate = candidate / "index.html"
    elif not candidate.suffix and not candidate.is_file():
        html_candidate = candidate.with_suffix(".html")
        if html_candidate.is_file():
            candidate = html_candidate
    return candidate

for rel in CORE:
    if not (ROOT / rel).is_file():
        problems.append(f"Falta página esencial: {rel}")

# SEO intent ownership: keep one canonical target per primary query.
seo_targets_path = ROOT / ".github" / "internal" / "seo-targets.json"
if not seo_targets_path.is_file():
    problems.append("Falta el mapa interno de intenciones SEO")
else:
    try:
        seo_targets_data = json.loads(seo_targets_path.read_text(encoding="utf-8"))
        seen_queries = {}
        sitemap_text_for_targets = (ROOT / "sitemap.xml").read_text(encoding="utf-8", errors="replace") if (ROOT / "sitemap.xml").is_file() else ""
        for target in seo_targets_data.get("targets", []):
            query = re.sub(r"\s+", " ", str(target.get("query") or "").strip().casefold())
            url = str(target.get("url") or "").strip()
            if not query or not url:
                problems.append("Entrada SEO sin query o URL")
                continue
            if query in seen_queries and seen_queries[query] != url:
                problems.append(f"Canibalización declarada: '{query}' -> {seen_queries[query]} y {url}")
            seen_queries[query] = url
            file_target = html_target(url)
            if file_target is None or not file_target.is_file():
                problems.append(f"Objetivo SEO sin página pública: {query} -> {url}")
            absolute = "https://cocinasinlios.com" + (url if url != "/" else "/")
            if f"<loc>{absolute}</loc>" not in sitemap_text_for_targets:
                problems.append(f"Objetivo SEO ausente del sitemap: {query} -> {url}")
    except Exception as exc:
        problems.append(f"Mapa SEO inválido: {exc}")

indexable_titles: dict[str, list[str]] = {}
indexable_descriptions: dict[str, list[str]] = {}
indexable_canonicals: list[str] = []

for path in ROOT.rglob("*"):
    if not path.is_file() or ".git" in path.parts or path.suffix.lower() not in PUBLIC_EXT:
        continue
    text = path.read_text(encoding="utf-8", errors="replace")
    for token in FORBIDDEN:
        if token.casefold() in text.casefold():
            problems.append(f"Referencia comercial no permitida en {path.relative_to(ROOT)}: {token}")
    # CSS URLs can live inside .css files or inline <style> blocks. Validate local assets too,
    # because href/src-only checks miss broken background images.
    for raw in re.findall(r"url\(\s*['\"]?(/[^)'\"\s]+)", text, flags=re.I):
        asset_path = ROOT / urlsplit(raw).path.lstrip("/")
        if not asset_path.is_file():
            problems.append(f"Asset CSS inexistente en {path.relative_to(ROOT)}: {raw}")
    if path.suffix.lower() == ".html":
        rel_name = str(path.relative_to(ROOT))
        title_match = re.search(r"<title>([\s\S]*?)</title>", text, flags=re.I)
        robots_match = re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\']([^"\']*)', text, flags=re.I)
        noindex = bool(robots_match and "noindex" in robots_match.group(1).casefold())
        if not title_match or not title_match.group(1).strip():
            problems.append(f"Página sin title: {rel_name}")
        if not re.search(r'<html[^>]+lang=["\']es', text, flags=re.I):
            problems.append(f"Página sin lang=es: {rel_name}")
        if not noindex:
            if not robots_match or "max-image-preview:large" not in robots_match.group(1).casefold():
                problems.append(f"Página indexable sin max-image-preview:large: {rel_name}")
            desc_match = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)', text, flags=re.I)
            if not desc_match:
                desc_match = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']description["\']', text, flags=re.I)
            if not desc_match or not desc_match.group(1).strip():
                problems.append(f"Página indexable sin meta description: {rel_name}")
            canonical_match = re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']([^"\']+)', text, flags=re.I)
            if not canonical_match:
                canonical_match = re.search(r'<link[^>]+href=["\']([^"\']+)["\'][^>]+rel=["\']canonical["\']', text, flags=re.I)
            if not canonical_match:
                problems.append(f"Página indexable sin canonical: {rel_name}")
            else:
                canonical = canonical_match.group(1)
                expected = None
                if rel_name == "index.html":
                    expected = "https://cocinasinlios.com/"
                elif rel_name.endswith("/index.html"):
                    expected = "https://cocinasinlios.com/" + rel_name[:-10]
                elif path.parent == ROOT and path.suffix.lower() == ".html":
                    expected = "https://cocinasinlios.com/" + path.stem
                if expected and canonical != expected:
                    problems.append(f"Canonical inesperado en {rel_name}: {canonical} (esperado {expected})")
                indexable_canonicals.append(canonical)
            h1_count = len(re.findall(r"<h1\b", text, flags=re.I))
            if h1_count != 1:
                problems.append(f"Página indexable con {h1_count} H1: {rel_name}")
            if title_match:
                t = re.sub(r"\s+", " ", title_match.group(1)).strip()
                indexable_titles.setdefault(t, []).append(rel_name)
                if len(t) < 18 or len(t) > 68:
                    warnings.append(f"Title SEO a revisar ({len(t)} caracteres): {rel_name} -> {t}")
            if desc_match:
                d = re.sub(r"\s+", " ", desc_match.group(1)).strip()
                indexable_descriptions.setdefault(d, []).append(rel_name)
                if len(d) < 70 or len(d) > 175:
                    warnings.append(f"Meta description a revisar ({len(d)} caracteres): {rel_name}")
        for raw in re.findall(r'(?:href|src)=["\']([^"\']+)["\']', text, flags=re.I):
            target = html_target(raw)
            if target is not None and not target.is_file():
                problems.append(f"Enlace interno roto en {path.relative_to(ROOT)}: {raw}")
        for tag in re.findall(r'<img\b[^>]*>', text, flags=re.I):
            if not re.search(r'\balt\s*=', tag, flags=re.I):
                problems.append(f"Imagen HTML sin alt en {path.relative_to(ROOT)}")
        for tag in re.findall(r'<a\b[^>]*target=["\']_blank["\'][^>]*>', text, flags=re.I):
            rel = re.search(r'\brel=["\']([^"\']*)', tag, flags=re.I)
            if not rel or "noopener" not in rel.group(1).casefold():
                problems.append(f"Enlace target=_blank sin rel=noopener en {path.relative_to(ROOT)}")
        for block in re.findall(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>([\s\S]*?)</script>', text, flags=re.I):
            try:
                json.loads(block.strip())
            except Exception as exc:
                problems.append(f"JSON-LD inválido en página {path.relative_to(ROOT)}: {exc}")

ingredient_guides = [
    "que-cocinar-con-huevos.html",
    "recetas-con-tomate.html",
    "recetas-con-calabacin.html",
    "recetas-con-pollo.html",
    "recetas-con-arroz.html",
]
for guide in ingredient_guides:
    guide_path = ROOT / guide
    if guide_path.is_file():
        guide_text = guide_path.read_text(encoding="utf-8", errors="replace")
        n_cross = guide_text.count('<section class="section ingredient-more">')
        if n_cross != 1:
            problems.append(f"Guía de ingrediente con {n_cross} bloques de navegación cruzada: {guide}")

problem_collections = [
    "cenas-sin-ganas-de-cocinar.html",
    "cenas-en-15-minutos.html",
    "cenas-de-despensa.html",
    "cocinar-una-vez-comer-dos-dias.html",
]
for collection in problem_collections:
    collection_path = ROOT / collection
    if collection_path.is_file():
        collection_text = collection_path.read_text(encoding="utf-8", errors="replace")
        if 'href="/hablamos"' not in collection_text:
            problems.append(f"Colección SEO sin vía de conversación con Macarena: {collection}")

# Internal discoverability: every indexable page should be linked from the site,
# not only listed in a sitemap. Normalize extensionless/trailing-slash paths.
linked_paths: set[str] = set()
for html_path in ROOT.rglob("*.html"):
    if ".git" in html_path.parts:
        continue
    html_text = html_path.read_text(encoding="utf-8", errors="replace")
    for raw in re.findall(r'href=["\']([^"\']+)["\']', html_text, flags=re.I):
        if not raw.startswith("/") or raw.startswith("//"):
            continue
        p = urlsplit(raw).path
        if p.endswith(".html"):
            p = p[:-5]
        p = p.rstrip("/") or "/"
        linked_paths.add(p)

for canonical in indexable_canonicals:
    p = urlsplit(canonical).path.rstrip("/") or "/"
    if p not in linked_paths:
        problems.append(f"Página indexable huérfana: {canonical}")

for title, paths in indexable_titles.items():
    if len(paths) > 1:
        problems.append(f"Páginas indexables: título duplicado '{title}' -> {', '.join(paths)}")
for desc, paths in indexable_descriptions.items():
    if len(paths) > 1:
        warnings.append(f"Meta description duplicada en páginas indexables -> {', '.join(paths)}")

sitemap = ROOT / "sitemap.xml"
if not sitemap.is_file():
    problems.append("Falta sitemap.xml")
else:
    sm = sitemap.read_text(encoding="utf-8", errors="replace")
    for loc in re.findall(r"<loc>(https://cocinasinlios\.com[^<]+)</loc>", sm):
        path = urlsplit(loc).path
        target = html_target(path)
        if target is not None and not target.is_file():
            problems.append(f"URL del sitemap sin archivo: {loc}")
        if target is not None and target.suffix == ".html" and target.is_file():
            text = target.read_text(encoding="utf-8", errors="replace")
            if re.search(r'<meta[^>]+name=["\']robots["\'][^>]+content=["\'][^"\']*noindex', text, flags=re.I):
                problems.append(f"URL noindex incluida en sitemap: {loc}")
    sitemap_urls = re.findall(r"<loc>(https://cocinasinlios\.com[^<]+)</loc>", sm)
    for canonical in indexable_canonicals:
        if canonical not in sitemap_urls:
            problems.append(f"Página indexable ausente del sitemap: {canonical}")
    if len(sitemap_urls) != len(set(sitemap_urls)):
        problems.append("Sitemap con URLs duplicadas")

# Internal-link graph: make orphaned sitemap pages visible before they become SEO debt.
if sitemap.is_file():
    sm_for_links = sitemap.read_text(encoding="utf-8", errors="replace")
    sitemap_paths = [urlsplit(x).path.rstrip("/") or "/" for x in re.findall(r"<loc>(https://cocinasinlios\.com[^<]+)</loc>", sm_for_links)]
    inbound = {p: 0 for p in sitemap_paths}
    for source in list(ROOT.rglob("*.html")) + list((ROOT / "assets").glob("*.js")):
        if not source.is_file() or ".git" in source.parts:
            continue
        source_text = source.read_text(encoding="utf-8", errors="replace")
        source_public = None
        if source.suffix.lower() == ".html":
            rel = str(source.relative_to(ROOT))
            if rel == "index.html":
                source_public = "/"
            elif rel.endswith("/index.html"):
                source_public = "/" + rel[:-10].rstrip("/")
            elif source.parent == ROOT:
                source_public = "/" + source.stem
        for raw in re.findall(r'href\s*=\s*["\'](/[^"\'#?]*)', source_text, flags=re.I):
            target = urlsplit(raw).path.rstrip("/") or "/"
            if target in inbound and target != source_public:
                inbound[target] += 1
    orphan_exempt = {"/aviso-legal","/privacidad","/cookies","/uso-y-propiedad"}
    for path, count in inbound.items():
        if path != "/" and path not in orphan_exempt and count == 0:
            warnings.append(f"URL del sitemap sin enlace interno entrante detectable: {path}")

# Flexible internal solution layer: useful in Resuelve hoy, never treated as published recipes.
solutions_path = ROOT / "assets" / "solutions-data.js"
solutions = []
if not solutions_path.is_file():
    problems.append("Falta la capa interna de fórmulas Sin Líos")
else:
    try:
        solutions_payload = solutions_path.read_text(encoding="utf-8", errors="replace")
        solutions_payload = re.sub(r"^\s*window\.CSL_SOLUTIONS\s*=\s*", "", solutions_payload)
        solutions_payload = re.sub(r";\s*$", "", solutions_payload)
        solutions = json.loads(solutions_payload)
        if len(solutions) < 20:
            warnings.append(f"Capa interna con poca variedad: {len(solutions)} fórmulas")
        seen_solution_slugs = set()
        for solution in solutions:
            slug = solution.get("slug")
            if not slug or slug in seen_solution_slugs:
                problems.append(f"Fórmula con slug ausente o duplicado: {slug}")
            seen_solution_slugs.add(slug)
            if solution.get("kind") != "formula":
                problems.append(f"Solución interna sin kind=formula: {slug}")
            if not solution.get("title") or not solution.get("intro"):
                problems.append(f"Fórmula sin título o introducción: {slug}")
            if not isinstance(solution.get("minutes"), (int, float)) or solution.get("minutes", 0) <= 0:
                problems.append(f"Fórmula sin minutos válidos: {slug}")
            if not (solution.get("steps") or []):
                problems.append(f"Fórmula sin montaje orientativo: {slug}")
            if not isinstance(solution.get("plan"), dict):
                problems.append(f"Fórmula sin metadatos de contexto: {slug}")
    except Exception as exc:
        problems.append(f"No se puede interpretar solutions-data.js: {exc}")

data = (ROOT / "assets" / "recipes-data.js").read_text(encoding="utf-8", errors="replace")
recipe_count = len(re.findall(r'"slug"\s*:\s*"[^"]+"', data))
try:
    payload = re.sub(r"^\s*window\.CSL_RECIPES\s*=\s*", "", data)
    payload = re.sub(r";\s*$", "", payload)
    recipes = json.loads(payload)
except Exception as exc:
    recipes = []
    problems.append(f"No se puede interpretar recipes-data.js: {exc}")

for recipe in recipes:
    slug = recipe.get("slug", "(sin slug)")
    image = str(recipe.get("image") or "")
    if image.startswith("/assets/recipes/"):
        image_path = ROOT / image.lstrip("/")
        if not image_path.is_file():
            problems.append(f"Foto declarada pero falta el archivo: {slug} -> {image}")
        elif image_path.stat().st_size < 1024:
            problems.append(f"Foto de receta demasiado pequeña o placeholder: {slug} -> {image}")
        page_path = ROOT / "recetas" / slug / "index.html"
        if page_path.is_file():
            page_text = page_path.read_text(encoding="utf-8", errors="replace")
            full_image = "https://cocinasinlios.com" + image
            if image not in page_text:
                problems.append(f"Foto no conectada al hero/ficha: {slug}")
            if f'<meta property="og:image" content="{full_image}">' not in page_text:
                problems.append(f"og:image no coincide con la foto: {slug}")
            if full_image not in page_text or '"image"' not in page_text:
                problems.append(f"Schema Recipe sin foto propia: {slug}")
    if not recipe.get("baseServings"):
        problems.append(f"Receta sin raciones base: {slug}")
    ingredients = recipe.get("ingredients") or []
    ingredient_data = recipe.get("ingredientData") or []
    if not ingredient_data or len(ingredients) != len(ingredient_data):
        problems.append(f"Ingredientes no escalables o desalineados: {slug}")
    contains = recipe.get("contains")
    if not isinstance(contains, dict) or not all(k in contains for k in ("pescado","carne","huevo","lacteos")):
        problems.append(f"Metadatos de exclusión incompletos: {slug}")
    cook = recipe.get("cook")
    if not isinstance(cook, dict) or not all(cook.get(k) for k in ("heat","time","cue")):
        problems.append(f"Guía de cocción incompleta: {slug}")
    if not recipe.get("family"):
        problems.append(f"Receta sin familia editorial: {slug}")
    image = recipe.get("image")
    if image and isinstance(image, str) and image.startswith("/"):
        image_path = ROOT / image.lstrip("/")
        if not image_path.is_file():
            problems.append(f"Imagen declarada pero inexistente: {slug} → {image}")

# Weekly planning integrity.
producer_keys = {
    p.get("key")
    for r in recipes
    for p in ((r.get("batch") or {}).get("produces") or [])
    if isinstance(p, dict) and p.get("key")
}
for recipe in recipes:
    slug = recipe.get("slug", "(sin slug)")
    batch = recipe.get("batch") or {}
    for use in batch.get("uses") or []:
        if not isinstance(use, dict) or not use.get("key"):
            problems.append(f"Aprovechamiento inválido: {slug}")
        elif use.get("key") not in producer_keys:
            problems.append(f"Aprovechamiento sin receta productora: {slug} -> {use.get('key')}")

planner = (ROOT / "plan-semana.html").read_text(encoding="utf-8", errors="replace")
dashboard = (ROOT / "mi-rincon.html").read_text(encoding="utf-8", errors="replace")
chooser = (ROOT / "que-cocino.html").read_text(encoding="utf-8", errors="replace")
if not re.search(r"(?:const|let|var)\s+esc\s*=|function\s+esc\s*\(", chooser):
    problems.append("Qué cocino ha perdido su helper de escape de HTML")
picker = (ROOT / "que-cocino.html").read_text(encoding="utf-8", errors="replace")
if "/assets/solutions-data.js" not in chooser or "window.CSL_SOLUTIONS" not in chooser or "const candidates=[...recipes,...formulas]" not in chooser:
    problems.append("Resuelve hoy no está cargando la capa interna de fórmulas")
if "/assets/solutions-data.js" in planner or "CSL_SOLUTIONS" in planner:
    problems.append("Planifica no debe usar fórmulas internas; solo recetas completas")
if "r.kind===\"formula\"" not in chooser or "PROPUESTA FLEXIBLE" not in chooser:
    problems.append("Resuelve hoy ha perdido el etiquetado explícito de fórmulas flexibles")


# Small runtime-contract checks for helpers used by dynamic renderers.
for label, source in [("Qué cocino", picker), ("Planifica", planner)]:
    if "esc(" in source and not re.search(r"(?:const|let|var)\s+esc\s*=|function\s+esc\s*\(", source):
        problems.append(f"{label} usa esc() pero no define el helper de escape")
for marker, label in [
    ("eligibleForPlan", "filtro estricto de tiempo"),
    ("r.plan?.t===\"rapida\"", "límite rápido"),
    ("makeDayFast", "ajuste de un día con poco margen"),
    ("renderStrategicPreps", "preparaciones estratégicas"),
    ("smartPreps:", "guardado de preparaciones estratégicas"),
]:
    if marker not in planner:
        problems.append(f"Planifica ha perdido: {label}")
if "w.smartPreps" not in dashboard or 'id="savedPrep"' not in dashboard:
    problems.append("Mi cocina no conserva las preparaciones estratégicas del plan")

# Quality warnings: these do not block deployment yet, but make editorial debt visible.
recipe_image_dir = ROOT / "assets" / "recipes"
if recipe_image_dir.is_dir():
    for image_path in recipe_image_dir.glob("*.webp"):
        size_bytes = image_path.stat().st_size
        size_kb = size_bytes / 1024
        if size_bytes < 5_000:
            problems.append(f"Foto WebP sospechosamente pequeña o vacía: {image_path.name} · {size_bytes} bytes")
        if size_kb > 350:
            warnings.append(f"Foto WebP pesada: {image_path.name} · {size_kb:.0f} KB")

if recipes:
    families = sorted({r.get("family") for r in recipes if r.get("family")})
    if len(families) > 12:
        warnings.append(f"Taxonomía dispersa: {len(families)} familias editoriales")
    proper_images = [r for r in recipes if str(r.get("image") or "").startswith("/assets/recipes/")]
    sprite_images = [r for r in recipes if isinstance(r.get("photoSprite"), dict) and r.get("photoSprite", {}).get("src")]
    for recipe in sprite_images:
        spec = recipe.get("photoSprite") or {}
        src = str(spec.get("src") or "")
        if not src.startswith("/") or not (ROOT / src.lstrip("/")).is_file():
            problems.append(f"Sprite de receta inexistente: {recipe.get('slug')} -> {src}")
        if not all(isinstance(spec.get(k), (int, float)) for k in ("cols","rows","x","y")):
            problems.append(f"Coordenadas de sprite incompletas: {recipe.get('slug')}")
    visual_slugs = {r.get("slug") for r in proper_images + sprite_images}
    missing_visuals = [r.get("slug") for r in recipes if r.get("slug") not in visual_slugs]
    if missing_visuals:
        warnings.append(f"Fotografía visible pendiente: {len(missing_visuals)} de {len(recipes)} fichas siguen con portada editorial")
    sprite_only = [r for r in sprite_images if r not in proper_images]
    if sprite_only:
        warnings.append(f"Foto social individual pendiente: {len(sprite_only)} fichas ya muestran foto mediante sprite, pero aún usan imagen genérica en Open Graph/Schema")
    step_counts = {}
    for r in recipes:
        n = len(r.get("steps") or [])
        step_counts[n] = step_counts.get(n, 0) + 1
    dominant = max(step_counts.values()) if step_counts else 0
    if dominant / max(len(recipes), 1) >= .90:
        warnings.append("Más del 90 % de las recetas comparten exactamente el mismo número de pasos; revisar sensación de plantilla")

# Stale privacy language must not contradict the live Cloudflare Web Analytics setup.
stale_analytics = "actualmente la web no envía tus acciones a un servicio de analítica"
for page in ROOT.glob("*.html"):
    txt = page.read_text(encoding="utf-8", errors="replace")
    if stale_analytics.casefold() in txt.casefold():
        problems.append(f"Texto de analítica desactualizado en {page.name}")

# An internal studio carrying noindex is still publicly reachable on a static site.
if (ROOT / "estudio-rrss.html").is_file():
    warnings.append("estudio-rrss.html sigue siendo accesible públicamente; noindex evita indexación, no acceso")

recipes_page = (ROOT / "recetas.html").read_text(encoding="utf-8", errors="replace")
collection_count_match = re.search(r'"numberOfItems":(\d+)', recipes_page)
if collection_count_match and int(collection_count_match.group(1)) != recipe_count:
    problems.append(f"numberOfItems del recetario: {collection_count_match.group(1)} pero hay {recipe_count} recetas")

home_text = (ROOT / "index.html").read_text(encoding="utf-8", errors="replace")
home_count_match = re.search(r'<strong>(\d+)</strong><span>recetas completas</span>', home_text, flags=re.I)
if home_count_match and int(home_count_match.group(1)) != recipe_count:
    problems.append(f"Contador de portada: {home_count_match.group(1)} pero hay {recipe_count} recetas")

recipes_index_text = (ROOT / "recetas.html").read_text(encoding="utf-8", errors="replace")
collection_count_match = re.search(r'"numberOfItems"\s*:\s*(\d+)', recipes_index_text)
if not collection_count_match:
    problems.append("Schema del recetario sin numberOfItems")
elif int(collection_count_match.group(1)) != recipe_count:
    problems.append(f"Schema del recetario: {collection_count_match.group(1)} items pero hay {recipe_count} recetas")

recipe_pages = list((ROOT / "recetas").glob("*/index.html"))
if len(recipe_pages) != recipe_count:
    problems.append(f"Recetas: {recipe_count} en datos pero {len(recipe_pages)} páginas publicadas")

recipe_by_slug = {r.get("slug"): r for r in recipes}
for page in recipe_pages:
    text = page.read_text(encoding="utf-8", errors="replace")
    if 'data-scale="1"' not in text or "/assets/recipe-page.js" not in text:
        problems.append(f"Ficha sin controles de cantidades: {page.relative_to(ROOT)}")
    ingredient_nodes = len(re.findall(r'<li\b[^>]*data-ing-index=', text, flags=re.I))
    expected_ingredients = len((recipe_by_slug.get(page.parent.name, {}) or {}).get("ingredients") or [])
    if ingredient_nodes != expected_ingredients:
        problems.append(f"Ingredientes visibles desalineados con maestro: {page.parent.name} ({ingredient_nodes}/{expected_ingredients})")
    if 'rel="canonical"' not in text:
        problems.append(f"Ficha sin canonical: {page.relative_to(ROOT)}")
    slug = page.parent.name
    recipe = recipe_by_slug.get(slug, {})
    real_image = str(recipe.get("image") or "")
    hero_match = re.search(r'<div class="hero-photo"[^>]*>\s*<img\b([^>]*)>', text, flags=re.I)
    if not hero_match:
        problems.append(f"Ficha sin imagen hero HTML indexable: {slug}")
    else:
        attrs = hero_match.group(1)
        if real_image and real_image not in attrs:
            problems.append(f"Hero HTML no usa la imagen maestra: {slug}")
        if not re.search(r'\balt=["\'][^"\']+["\']', attrs, flags=re.I):
            problems.append(f"Hero HTML sin alt descriptivo: {slug}")
        if 'fetchpriority="high"' not in attrs:
            problems.append(f"Hero HTML sin prioridad alta: {slug}")
    runtime_match = re.search(r'window\.CSL_RECIPE=(\{[\s\S]*?\});</script>', text)
    if not runtime_match:
        problems.append(f"Ficha sin datos runtime CSL_RECIPE: {slug}")
    else:
        try:
            runtime_recipe = json.loads(runtime_match.group(1))
            if runtime_recipe.get("ingredientData") != recipe.get("ingredientData"):
                problems.append(f"IngredientData de ficha desincronizado con maestro: {slug}")
        except Exception as exc:
            problems.append(f"CSL_RECIPE inválido en {page.relative_to(ROOT)}: {exc}")
    ld_match = re.search(r'<script type="application/ld\+json">([\s\S]*?)</script>', text, flags=re.I)
    if ld_match:
        try:
            ld = json.loads(ld_match.group(1))
            image_value = ld.get("image")
            image_text = " ".join(image_value) if isinstance(image_value, list) else str(image_value or "")
            if "/assets/sprite.webp" in image_text:
                problems.append(f"Schema Recipe usa imagen genérica en {page.relative_to(ROOT)}")
            real_image = recipe.get("image")
            if isinstance(real_image, str) and real_image.startswith("/assets/recipes/"):
                expected = "https://cocinasinlios.com" + real_image
                if expected not in image_text:
                    problems.append(f"Foto real no conectada al Schema Recipe: {slug}")
                og = re.search(r'<meta property=["\']og:image["\'] content=["\']([^"\']+)', text, flags=re.I)
                if not og or expected not in og.group(1):
                    problems.append(f"Foto real no conectada a og:image: {slug}")
        except Exception as exc:
            problems.append(f"JSON-LD inválido en {page.relative_to(ROOT)}: {exc}")

if sitemap.is_file():
    sm = sitemap.read_text(encoding="utf-8", errors="replace")
    recipe_urls = re.findall(r"<loc>https://cocinasinlios\.com/recetas/[^<]+/</loc>", sm)
    if len(recipe_urls) != recipe_count:
        problems.append(f"Recetas: {recipe_count} en datos pero {len(recipe_urls)} URLs en sitemap")

image_sitemap = ROOT / "image-sitemap.xml"
if not image_sitemap.is_file():
    problems.append("Falta image-sitemap.xml")
else:
    ism = image_sitemap.read_text(encoding="utf-8", errors="replace")
    image_urls = re.findall(r"<image:loc>https://cocinasinlios\.com/assets/recipes/[^<]+</image:loc>", ism)
    image_recipe_urls = re.findall(r"<loc>https://cocinasinlios\.com/recetas/[^<]+/</loc>", ism)
    if len(image_urls) != recipe_count or len(image_recipe_urls) != recipe_count:
        problems.append(f"Sitemap de imágenes desalineado: {len(image_urls)} imágenes / {len(image_recipe_urls)} recetas / {recipe_count} esperadas")
    for recipe in recipes:
        slug = recipe.get("slug")
        image = recipe.get("image")
        if slug and image and f"https://cocinasinlios.com{image}" not in ism:
            problems.append(f"Foto ausente del sitemap de imágenes: {slug}")
robots_path = ROOT / "robots.txt"
if robots_path.is_file():
    robots_text = robots_path.read_text(encoding="utf-8", errors="replace")
    if "https://cocinasinlios.com/image-sitemap.xml" not in robots_text:
        problems.append("robots.txt no anuncia el sitemap de imágenes")

# PWA/installability integrity.
manifest_path = ROOT / "site.webmanifest"
if not manifest_path.is_file():
    problems.append("PWA manifest ausente")
else:
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8", errors="replace"))
        icons = manifest.get("icons") or []
        icon_sizes = {i.get("sizes") for i in icons if isinstance(i, dict)}
        if "192x192" not in icon_sizes or "512x512" not in icon_sizes:
            problems.append("PWA manifest sin iconos 192x192 y 512x512")
        for icon in icons:
            if not isinstance(icon, dict) or not icon.get("src"):
                continue
            src = str(icon["src"])
            if src.startswith("/"):
                p = ROOT / src.lstrip("/")
                if not p.is_file():
                    problems.append(f"Icono PWA inexistente: {src}")
        if not manifest.get("start_url") or not manifest.get("display"):
            problems.append("PWA manifest incompleto: start_url/display")
    except Exception as exc:
        problems.append(f"PWA manifest inválido: {exc}")

if not (ROOT / "sw.js").is_file():
    problems.append("Service worker ausente")
site_js = (ROOT / "assets" / "site.js").read_text(encoding="utf-8", errors="replace")
if "site.webmanifest" not in site_js:
    problems.append("El sitio no enlaza el manifiesto globalmente")
if "navigator.serviceWorker.register" not in site_js:
    problems.append("El sitio no registra el service worker")

# Product-layer integrity.
weekly_page = ROOT / "semana-sin-lios.html"
weekly_data = ROOT / "assets" / "weekly-data.js"
reuse_map = ROOT / "assets" / "reuse-map.js"
recipe_runtime = ROOT / "assets" / "recipe-page.js"
for required, label in [
    (weekly_page, "página Semana Sin Líos"),
    (weekly_data, "datos rotativos de Semana Sin Líos"),
    (reuse_map, "red de aprovechamiento entre recetas"),
]:
    if not required.is_file():
        problems.append(f"Falta {label}")
if weekly_page.is_file() and weekly_data.is_file():
    wp = weekly_page.read_text(encoding="utf-8", errors="replace")
    wd = weekly_data.read_text(encoding="utf-8", errors="replace")
    if "CSL_GET_WEEKLY" not in wp or "CSL_GET_WEEKLY" not in wd:
        problems.append("Semana Sin Líos ha perdido su rotación semanal")
if recipe_runtime.is_file():
    rr = recipe_runtime.read_text(encoding="utf-8", errors="replace")
    if "reuse-map.js" not in rr or "renderReuseNetwork" not in rr:
        problems.append("Las fichas han perdido la red de aprovechamiento entre recetas")
    if "BreadcrumbList" not in rr or "con-macarena#macarena" not in rr:
        problems.append("Las fichas han perdido breadcrumb o identidad de autor estructurada")
if not re.search(r'auto\s*=\s*params\.get\(["\']auto["\']\)\s*===?\s*["\']1["\']', picker) or "if(auto)setTimeout(render,0)" not in picker:
    problems.append("Resuelve hoy ha perdido el modo Decide por mí")

problem_collections = [
    "cenas-sin-ganas-de-cocinar.html",
    "cenas-en-15-minutos.html",
    "cenas-de-despensa.html",
    "cocinar-una-vez-comer-dos-dias.html",
]
for page in problem_collections:
    p = ROOT / page
    if p.is_file():
        txt = p.read_text(encoding="utf-8", errors="replace")
        if "/que-cocino?auto=1" not in txt:
            problems.append(f"Colección sin salida a Decide por mí: {page}")

# Validate that dynamic editorial datasets cannot silently drift away from the recipe master.
if reuse_map.is_file():
    try:
        reuse_payload = reuse_map.read_text(encoding="utf-8", errors="replace")
        reuse_payload = re.sub(r"^\s*window\.CSL_REUSE_MAP\s*=\s*", "", reuse_payload)
        reuse_payload = re.sub(r";\s*$", "", reuse_payload)
        reuse_data = json.loads(reuse_payload)
        known_slugs = {r.get("slug") for r in recipes if r.get("slug")}
        if set(reuse_data) != known_slugs:
            missing = sorted(known_slugs - set(reuse_data))
            extra = sorted(set(reuse_data) - known_slugs)
            problems.append(f"Red de aprovechamiento desincronizada. Faltan: {missing}; sobran: {extra}")
        for source_slug, entry in reuse_data.items():
            for group in (entry.get("links") or []):
                for target in (group.get("recipes") or []):
                    slug = target.get("slug")
                    if slug not in known_slugs:
                        problems.append(f"Red de aprovechamiento apunta a receta inexistente: {source_slug} -> {slug}")
    except Exception as exc:
        problems.append(f"No se puede interpretar reuse-map.js: {exc}")

if weekly_data.is_file():
    wd = weekly_data.read_text(encoding="utf-8", errors="replace")
    weekly_blocks = re.findall(r'slugs:\s*\[([^\]]+)\]', wd)
    weekly_slugs = [s for block in weekly_blocks for s in re.findall(r'["\']([^"\']+)["\']', block)]
    known_slugs = {r.get("slug") for r in recipes if r.get("slug")}
    bad_weekly = sorted({s for s in weekly_slugs if s not in known_slugs})
    if bad_weekly:
        problems.append(f"Semana Sin Líos usa recetas inexistentes: {bad_weekly}")
    if len(weekly_blocks) < 8:
        problems.append("Semana Sin Líos tiene menos de 8 propuestas rotativas")

if manifest_path.is_file():
    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8", errors="replace"))
        shortcut_urls = {s.get("url") for s in (manifest.get("shortcuts") or []) if isinstance(s, dict)}
        for needed in ("/que-cocino?auto=1", "/semana-sin-lios", "/plan-semana", "/mi-rincon"):
            if needed not in shortcut_urls:
                problems.append(f"PWA sin acceso diferencial: {needed}")
    except Exception:
        pass

if problems:
    print("\nSITE QA: ERROR\n")
    for p in problems:
        print(" -", p)
    if warnings:
        print("\nAvisos de calidad:")
        for w in warnings:
            print(" !", w)
    sys.exit(1)

print(f"SITE QA: OK · {recipe_count} recetas · enlaces internos y separación editorial verificados")
if warnings:
    print("Avisos de calidad:")
    for w in warnings:
        print(" !", w)
