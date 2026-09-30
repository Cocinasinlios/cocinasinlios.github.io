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
La web se mantiene separada de cualquier actividad de promoción o venta de productos de terceros. No incorpora analítica publicitaria ni seguimiento automático del recorrido. Las preferencias se guardan localmente solo cuando el usuario activa una función.

## Producción
- Dominio: https://cocinasinlios.com/
- Marca: Cocina sin líos con Macarena
- Dominio de producción configurado; documentar cualquier cambio DNS antes de tocar registros.

## Medición
- Instrumentación cookieless de eventos clave en `assets/site.js`.
- Los conteos se guardan localmente mientras no exista un endpoint de analítica configurado.
- Puede conectarse un endpoint same-origin mediante `<meta name="csl-analytics-endpoint" content="/...">`.
- No hay identificadores publicitarios ni cookies de seguimiento.
