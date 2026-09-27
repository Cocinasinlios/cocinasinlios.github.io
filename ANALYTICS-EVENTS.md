# Medición — Cocina sin líos

La web no envía actualmente eventos a ningún tercero. assets/site.js mantiene un dataLayer local y eventos csl:* preparados para conectar una solución de analítica cuando exista cuenta y consentimiento/configuración adecuados.

## Eventos actuales
- csl_contact_start
- csl_whatsapp_open
- csl_recipe_open
- csl_method_step
- csl_favorite_add
- csl_favorite_remove
- csl_search_result
- csl_route_choose
- csl_meal_picker_generate
- csl_adapt_choose
- csl_organize_choose
- csl_rescue_choose
- csl_tm7_test_complete

## Principios
- No registrar texto libre.
- No registrar el contenido de mensajes de WhatsApp.
- No registrar respuestas detalladas del test TM7.
- Usar categorías cerradas cuando se necesite contexto.
- Medir recorrido y utilidad, no perfilar a la persona.

## KPIs cuando conectemos GA4/Search Console
1. Búsqueda orgánica → página de entrada.
2. Página de entrada → segunda página.
3. Uso de herramientas.
4. Herramienta → receta / método / Hablamos.
5. Inicio de conversación.
6. Contenido guardado en Mi rincón.
7. Consultas de búsqueda que generan impresiones/clics en Search Console.
