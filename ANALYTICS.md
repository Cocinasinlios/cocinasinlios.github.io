# Analítica de producto

Cocina sin líos registra eventos agregados y sin cookies en Workers Analytics Engine.

## Dataset

`csl_product_events`

Columnas:
- `blob1`: evento
- `blob2`: ruta actual
- `blob3`: destino, cuando aplica
- `blob4`: origen (`direct`, `internal`, `external`)
- `blob5`: viewport (`mobile`, `tablet`, `desktop`)
- `double1`: 1

No se escribe en el dataset IP, user-agent, correo, nombre, texto introducido por el visitante, despensa, favoritos ni contenido del plan.

## Eventos principales

- `page_view`
- `meal_picker_generate`
- `meal_picker_regenerate`
- `recipe_open`
- `add_to_week`
- `plan_generate`
- `plan_swap`
- `plan_save`
- `favorite_toggle`
- `share`
- `tool_open`
- `use_soon`

## Consultas útiles

Páginas vistas en los últimos 7 días:

```sql
SELECT blob2 AS path, SUM(_sample_interval) AS views
FROM csl_product_events
WHERE timestamp > NOW() - INTERVAL '7' DAY
  AND blob1 = 'page_view'
GROUP BY path
ORDER BY views DESC;
```

Embudo principal:

```sql
SELECT blob1 AS event, SUM(_sample_interval) AS events
FROM csl_product_events
WHERE timestamp > NOW() - INTERVAL '7' DAY
  AND blob1 IN ('meal_picker_generate','recipe_open','add_to_week','plan_save')
GROUP BY event
ORDER BY events DESC;
```

Uso por dispositivo:

```sql
SELECT blob5 AS viewport, SUM(_sample_interval) AS events
FROM csl_product_events
WHERE timestamp > NOW() - INTERVAL '30' DAY
GROUP BY viewport
ORDER BY events DESC;
```

Origen general:

```sql
SELECT blob4 AS source, SUM(_sample_interval) AS events
FROM csl_product_events
WHERE timestamp > NOW() - INTERVAL '30' DAY
  AND blob1 = 'page_view'
GROUP BY source
ORDER BY events DESC;
```

## Visitantes únicos

Este dataset evita deliberadamente un identificador de visitante, por lo que mide páginas y acciones, no personas únicas. Para una cifra de visitantes únicos con una herramienta de analítica dedicada, activar Cloudflare Web Analytics o conectar una plataforma de analítica de producto.
