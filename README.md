# Cocina sin líos con Macarena

Proyecto editorial propio de cocina doméstica y organización, publicado desde GitHub y servido en https://cocinasinlios.com/.

## Producto público
- Qué cocino: tres ideas según tiempo, antojo y objetivo.
- Despensa Sin Líos: checklist local de básicos.
- Planifica: cinco cenas, compra orientativa y guardado voluntario en el dispositivo.
- Mi cocina: panel local con despensa, semana, compra, favoritos y “gastar pronto”.
- Recetas: biblioteca editorial de 50 recetas completas, con URLs estáticas, favoritos, compartir, sustituciones, aprovechamiento y aprendizaje.
- Organiza Sin Líos: decisiones y rutinas sencillas.

## Límites
La web se mantiene separada de cualquier actividad de promoción o venta de productos de terceros. No incorpora publicidad comportamental ni identificadores de usuario. Las preferencias funcionales se guardan localmente en el navegador; los eventos técnicos agregados se envían al propio dominio y se registran en Cloudflare Workers Analytics Engine sin incluir el contenido de la despensa, preferencias, favoritos o plan semanal.

## Producción
- Dominio: https://cocinasinlios.com/
- Marca: Cocina sin líos con Macarena
- Dominio de producción configurado; documentar cualquier cambio DNS antes de tocar registros.

## Medición
- Instrumentación cookieless de eventos clave en `assets/site.js`.
- En el navegador solo se persisten contadores agregados por evento/ruta; no se guarda historial de eventos.
- No hay identificador de usuario, cookies de analítica ni envío actual a terceros.
- Puede conectarse en el futuro un endpoint same-origin mediante `<meta name="csl-analytics-endpoint" content="/...">`, previa revisión de privacidad.
