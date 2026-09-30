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
La web se mantiene separada de cualquier actividad de promoción o venta de productos de terceros. No incorpora publicidad comportamental ni identificadores de usuario. Las preferencias funcionales se guardan localmente en el navegador. La medición de producto está desactivada por defecto y no se envían actualmente eventos de uso a un servicio de analítica.

## Producción
- Dominio: https://cocinasinlios.com/
- Marca: Cocina sin líos con Macarena
- Dominio de producción configurado; documentar cualquier cambio DNS antes de tocar registros.

## Medición
- La instrumentación de eventos existe en `assets/site.js`, pero está desactivada por defecto.
- Solo se activaría mediante un endpoint same-origin configurado expresamente con `csl-analytics-endpoint`.
- No hay identificador de usuario, cookies de analítica ni envío actual de eventos de navegación.
- Cualquier activación futura requiere revisar antes la información de privacidad.
