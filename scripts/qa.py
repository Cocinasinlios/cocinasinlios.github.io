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
    return candidate

for rel in CORE:
    if not (ROOT / rel).is_file():
        problems.append(f"Falta página esencial: {rel}")

indexable_titles: dict[str, list[str]] = {}
indexable_descriptions: dict[str, list[str]] = {}

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
            desc_match = re.search(r'<meta[^>]+name=["\']description["\'][^>]+content=["\']([^"\']+)', text, flags=re.I)
            if not desc_match:
                desc_match = re.search(r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+name=["\']description["\']', text, flags=re.I)
            if not desc_match or not desc_match.group(1).strip():
                problems.append(f"Página indexable sin meta description: {rel_name}")
            if not re.search(r'<link[^>]+rel=["\']canonical["\'][^>]+href=["\']', text, flags=re.I) and not re.search(r'<link[^>]+href=["\'][^"\']+["\'][^>]+rel=["\']canonical["\']', text, flags=re.I):
                problems.append(f"Página indexable sin canonical: {rel_name}")
            h1_count = len(re.findall(r"<h1\b", text, flags=re.I))
            if h1_count != 1:
                problems.append(f"Página indexable con {h1_count} H1: {rel_name}")
            if title_match:
                t = re.sub(r"\s+", " ", title_match.group(1)).strip()
                indexable_titles.setdefault(t, []).append(rel_name)
            if desc_match:
                d = re.sub(r"\s+", " ", desc_match.group(1)).strip()
                indexable_descriptions.setdefault(d, []).append(rel_name)
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
picker = (ROOT / "que-cocino.html").read_text(encoding="utf-8", errors="replace")

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
