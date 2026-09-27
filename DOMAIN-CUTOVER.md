# Dominio objetivo: cocinasinlios.com

Estado de trabajo (27-09-2026): dominio comprado en DonDominio y todavía pendiente de activación/validación. **No crear el CNAME de producción ni cambiar canonicals hasta que el dominio esté activo y el DNS pueda editarse.**

## Corte a dominio propio — orden seguro

1. En GitHub > Settings > Pages, añadir `cocinasinlios.com` como Custom domain.
2. En DonDominio, para el dominio raíz `@`, crear los cuatro registros A de GitHub Pages:
   - 185.199.108.153
   - 185.199.109.153
   - 185.199.110.153
   - 185.199.111.153
3. Crear `www` como CNAME apuntando a `cocinasinlios.github.io`.
4. Esperar propagación y comprobar que raíz y www resuelven correctamente.
5. Activar Enforce HTTPS en GitHub Pages cuando esté disponible.
6. Solo después:
   - añadir/confirmar `CNAME` con `cocinasinlios.com`;
   - sustituir canonicals, og:url, sitemap y robots de `https://cocinasinlios.com` por `https://cocinasinlios.com`;
   - comprobar redirección de la URL antigua;
   - crear propiedad de dominio en Google Search Console y verificarla por DNS;
   - enviar `https://cocinasinlios.com/sitemap.xml`.

No usar registros DNS comodín.
