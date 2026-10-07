# Auditoría de embudo y cierre técnico · 7 octubre 2026

## Estado que NO se toca en producción

- Web pública: `cocinasinlios.com` sigue en `main`.
- WhatsApp: la v7 validada continúa siendo la única versión de producción.
- La v12 de WhatsApp es candidata de staging y no se despliega todavía.

## Recorrido real actual

`Portada → Con Macarena → Hablamos → WhatsApp → Make → CRM`

### Lo que ya funciona

- La portada presenta a Macarena y enlaza a `/con-macarena`.
- `/con-macarena` incluye CTA a `/hablamos`.
- `/hablamos` ofrece cinco enlaces de WhatsApp con texto preescrito.
- Todos esos textos incluyen la frase exacta: `Te escribo desde Cocina sin líos.`
- Ese texto permite identificar de forma determinista que el contacto procede de la web.
- La web tiene 50 fichas de receta y 50 imágenes individuales en `assets/recipes`.
- `Site QA` está pasando en GitHub Actions.
- La auditoría de producción más reciente también pasó resolución de URLs, screenshots mobile, smoke test funcional y Lighthouse.

## Fuga de captación encontrada

El origen web no se conserva todavía de forma explícita en el CRM.

La columna `AC · tipo_contacto` sí existe, pero las rutas normales de cliente existente y cliente nuevo no la rellenan con `WEB`. La ruta de prospección sí utiliza esa columna para `PROSPECCION`.

### Mejora candidata para WhatsApp final

Cuando el mensaje entrante contenga exactamente `Te escribo desde Cocina sin líos.`, conservar `tipo_contacto = WEB`.

Requisitos:
- no alterar `PROSPECCION`;
- no sobrescribir un tipo de contacto más específico si existe;
- aplicar lo mismo a texto y, si procede, a audio;
- probar en staging antes del despliegue.

## Fricción de conversión encontrada

Desde portada hasta WhatsApp hay normalmente dos pasos:
1. `Conocerme`;
2. `Hablar conmigo`.

No es un fallo técnico, pero sí añade fricción a quien ya quiere escribir a Macarena.

### Mejora web candidata

Añadir en el bloque final de Macarena de la portada un CTA secundario discreto:
- `Preguntarme directamente →`
- destino: `/hablamos`

Debe mantenerse la separación editorial:
- no mencionar Thermomix, TM7, Vorwerk ni venta;
- no convertir la portada en una landing comercial;
- conservar `Conocerme →` como CTA principal o equivalente.

## Legal pendiente

El aviso legal sigue indicando:
- `Domicilio: Pendiente de actualización.`
- aviso provisional.

Privacidad también lo referencia.

No completar este dato sin decisión expresa de Macarena.

## Fotografía

El antiguo `photo-plan.md` marca 20 recetas como pendientes, pero el repositorio actual contiene imagen individual para las 50 recetas publicadas.

Ese documento está desactualizado y debe archivarse o marcarse como completado para evitar que vuelva a aparecer como tarea pendiente.

## Puertas de despliegue final

Antes de tocar producción:

1. Importar una sola candidata final de WhatsApp.
2. Mantener el escenario original apagado.
3. Ejecutar la matriz final de pruebas de texto y audio.
4. Verificar que no hay doble respuesta.
5. Verificar derivación real a Macarena.
6. Verificar alta y actualización CRM.
7. Verificar atribución WEB si se incorpora.
8. Ejecutar Site QA antes de cualquier cambio web.
9. No completar el domicilio legal sin dato aprobado.
10. Desplegar web y WhatsApp por separado para poder aislar cualquier regresión.

## Prioridad recomendada

1. Cerrar v12/v13 de WhatsApp en staging.
2. Incorporar atribución WEB si puede hacerse sin ampliar riesgo.
3. Una sola ronda de pruebas.
4. Después, preparar CTA secundario de portada en rama separada.
5. Resolver el domicilio legal al final.
