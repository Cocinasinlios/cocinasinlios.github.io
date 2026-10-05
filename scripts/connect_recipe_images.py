from __future__ import annotations

from datetime import date
from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "assets" / "recipes-data.js"
SITEMAP = ROOT / "sitemap.xml"

PHOTO_SLUGS = [
    "hummus-cremoso",
    "tortitas-fruta",
    "ensalada-lentejas-verduras",
    "pasta-tomate-atun",
    "pollo-curry-expres",
    "bacalao-tomate",
    "tacos-pescado",
    "berenjenas-rellenas",
    "calabacines-rellenos",
    "sopa-tomate-alubias",
    "potaje-alubias-rapido",
    "sopa-ajo-huevo",
    "ensalada-pasta-verano",
    "patatas-asadas-rellenas",
    "croquetas-pollo-aprovechamiento",
    "guacamole",
    "salsa-tomate-casera",
    "vinagreta-mostaza-limon",
    "muffins-platano-avena",
    "crumble-manzana",
]

PREFIX = "window.CSL_RECIPES="
raw = DATA.read_text(encoding="utf-8").strip()
if not raw.startswith(PREFIX):
    raise SystemExit("recipes-data.js no tiene el formato esperado")
recipes = json.loads(raw[len(PREFIX):].rstrip(";"))
by_slug = {r.get("slug"): r for r in recipes}
today = date.today().isoformat()
connected = []

def replace_meta(page: str, prop: str, value: str) -> str:
    pattern = rf'(<meta\s+property="{re.escape(prop)}"\s+content=")[^"]*(">)'
    return re.sub(pattern, rf'\g<1>{value}\2', page, count=1)

def replace_name_meta(page: str, name: str, value: str) -> str:
    pattern = rf'(<meta\s+name="{re.escape(name)}"\s+content=")[^"]*(">)'
    return re.sub(pattern, rf'\g<1>{value}\2', page, count=1)

for slug in PHOTO_SLUGS:
    file_name = f"{slug}.webp"
    asset = ROOT / "assets" / "recipes" / file_name
    if not asset.is_file() or asset.stat().st_size < 5_000:
        continue

    recipe = by_slug.get(slug)
    if not recipe:
        raise SystemExit(f"No existe receta para {slug}")

    rel_image = f"/assets/recipes/{file_name}"
    full_image = "https://cocinasinlios.com" + rel_image
    recipe["image"] = rel_image

    page_path = ROOT / "recetas" / slug / "index.html"
    if not page_path.is_file():
        raise SystemExit(f"Falta ficha estática: {slug}")
    page = page_path.read_text(encoding="utf-8")

    page = replace_meta(page, "og:image", full_image)
    page = replace_name_meta(page, "twitter:image", full_image)

    runtime_pattern = re.compile(r'(window\.CSL_RECIPE=)(\{[^<]*\})(;</script>)', re.S)
    runtime_match = runtime_pattern.search(page)
    if runtime_match:
        runtime = json.loads(runtime_match.group(2))
        runtime["image"] = rel_image
        page = (
            page[:runtime_match.start(2)]
            + json.dumps(runtime, ensure_ascii=False, separators=(",", ":"))
            + page[runtime_match.end(2):]
        )

    ld_pattern = re.compile(
        r'(<script type="application/ld\+json">)(\{[^<]*"@type":"Recipe"[^<]*\})(</script>)',
        re.S,
    )
    match = ld_pattern.search(page)
    if not match:
        raise SystemExit(f"No encuentro Recipe JSON-LD en {slug}")
    ld = json.loads(match.group(2))
    ld["image"] = [full_image]
    page = page[:match.start(2)] + json.dumps(ld, ensure_ascii=False, separators=(",", ":")) + page[match.end(2):]

    title = html.escape(str(recipe.get("title") or slug), quote=True)
    hero = (
        f'<div class="hero-photo" style="background-image:url(\'{rel_image}\');'
        f'background-size:cover;background-position:center" role="img" aria-label="{title}"></div>'
    )
    fallback_pattern = re.compile(
        r'<div class="hero-photo no-photo [^"]+" role="img" aria-label="[^"]*">'
        r'<div class="cover-copy">.*?</div></div>',
        re.S,
    )
    if fallback_pattern.search(page):
        page = fallback_pattern.sub(hero, page, count=1)
    else:
        existing_pattern = re.compile(
            r'<div class="hero-photo"[^>]*role="img" aria-label="[^"]*"></div>',
            re.S,
        )
        if existing_pattern.search(page):
            page = existing_pattern.sub(hero, page, count=1)
        elif rel_image not in page:
            raise SystemExit(f"No encuentro hero actualizable en {slug}")

    page_path.write_text(page, encoding="utf-8")
    connected.append(slug)

DATA.write_text(PREFIX + json.dumps(recipes, ensure_ascii=False, separators=(",", ":")) + ";\n", encoding="utf-8")

if SITEMAP.is_file() and connected:
    sm = SITEMAP.read_text(encoding="utf-8")
    for slug in connected:
        pattern = rf'(<loc>https://cocinasinlios\.com/recetas/{re.escape(slug)}/</loc><lastmod>)[^<]+(</lastmod>)'
        sm = re.sub(pattern, rf'\g<1>{today}\2', sm)
    SITEMAP.write_text(sm, encoding="utf-8")

print(f"Fotos conectadas: {len(connected)}")
for slug in connected:
    print(" -", slug)
