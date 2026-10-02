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

for path in ROOT.rglob("*"):
    if not path.is_file() or ".git" in path.parts or path.suffix.lower() not in PUBLIC_EXT:
        continue
    text = path.read_text(encoding="utf-8", errors="replace")
    for token in FORBIDDEN:
        if token.casefold() in text.casefold():
            problems.append(f"Referencia comercial no permitida en {path.relative_to(ROOT)}: {token}")
    if path.suffix.lower() == ".html":
        for raw in re.findall(r'(?:href|src)=["\']([^"\']+)["\']', text, flags=re.I):
            target = html_target(raw)
            if target is not None and not target.is_file():
                problems.append(f"Enlace interno roto en {path.relative_to(ROOT)}: {raw}")

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

# Quality warnings: these do not block deployment yet, but make editorial debt visible.
if recipes:
    proper_images = [r for r in recipes if str(r.get("image") or "").startswith("/assets/recipes/")]
    if len(proper_images) < len(recipes):
        warnings.append(f"Fotografía de receta pendiente: {len(recipes)-len(proper_images)} de {len(recipes)} fichas no tienen imagen individual de alta resolución")
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

recipe_pages = list((ROOT / "recetas").glob("*/index.html"))
if len(recipe_pages) != recipe_count:
    problems.append(f"Recetas: {recipe_count} en datos pero {len(recipe_pages)} páginas publicadas")

for page in recipe_pages:
    text = page.read_text(encoding="utf-8", errors="replace")
    if 'data-scale="1"' not in text or "/assets/recipe-page.js" not in text:
        problems.append(f"Ficha sin controles de cantidades: {page.relative_to(ROOT)}")
    if 'rel="canonical"' not in text:
        problems.append(f"Ficha sin canonical: {page.relative_to(ROOT)}")

if sitemap.is_file():
    sm = sitemap.read_text(encoding="utf-8", errors="replace")
    recipe_urls = re.findall(r"<loc>https://cocinasinlios\.com/recetas/[^<]+/</loc>", sm)
    if len(recipe_urls) != recipe_count:
        problems.append(f"Recetas: {recipe_count} en datos pero {len(recipe_urls)} URLs en sitemap")

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
