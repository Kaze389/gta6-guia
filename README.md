# gta6-guia

Web estática (GitHub Pages) con guía de GTA VI en español: checklist con progreso guardado en el navegador, datos clave, FAQ y una sección de respuestas (una página por pregunta) pensada para búsquedas de cola larga.

## Cómo se actualiza

```
1. Editar data.js
2. node build.js        (Node 18 o superior, sin dependencias ni npm install)
3. git add -A && git commit -m "..." && git push
```

`build.js` lee `data.js`, comprueba que los datos son válidos (ids y slugs únicos, fechas, fuentes, enlaces entre respuestas) y, si todo está bien, genera:

| Archivo generado | Qué es |
|---|---|
| `index.html` | Inicio: cuenta atrás, datos clave, resumen de tu progreso, últimas respuestas y FAQ |
| `checklist/index.html` | Checklist completa con progreso en `localStorage` |
| `faq/index.html` | Preguntas frecuentes (schema FAQPage) |
| `respuestas/index.html` | Índice de respuestas |
| `respuestas/<slug>/index.html` | Una página por respuesta (schema Article + migas de pan) |
| `404.html`, `sitemap.xml`, `robots.txt` | Página de error, mapa del sitio y robots |

**No edites a mano los archivos generados**: se sobrescriben en cada build (las carpetas `checklist/`, `faq/` y `respuestas/` se borran y se crean de nuevo). Si `data.js` tiene un error, el build se para, explica qué falla y no toca nada.

Para verlo en local antes de subir: desde la carpeta que contiene el repo, `python3 -m http.server` y abre `http://localhost:8000/gta6-guia/`.

## Añadir una respuesta

Añade un objeto al array `respuestas` de `data.js` (los campos están explicados en el propio archivo):

- `slug`: la URL (`/respuestas/<slug>/`). Minúsculas y guiones. **No lo cambies una vez publicado.**
- `pregunta`: tal como la escribiría la gente en Google.
- `respuesta`: la respuesta corta (1-3 frases). Sale arriba y como descripción en Google.
- `explicacion`: lista de párrafos.
- `fecha`: última revisión (AAAA-MM-DD).
- `fuentes`: `[{ nombre, url }]`.
- `relacionadas` (opcional): slugs a enlazar primero; el resto se completa solo con las más recientes.
- `titulo` (opcional): `<title>` distinto de la pregunta.

En `faq`, el campo opcional `ver` enlaza una pregunta con su respuesta larga.

## Reglas de contenido
- Los `id` de la checklist no se cambian nunca: el progreso de cada visitante se guarda por id (clave `gta6-guia-progreso` en `localStorage`).
- Solo datos confirmados por Rockstar o por al menos dos fuentes fiables. Nada de rumores ni texto copiado de otras webs.
- Cada actualización se anota en `CHANGELOG.md` con fecha y fuentes.
- Prohibido: trucos/mods de pago, venta de cuentas o dinero del juego, material con copyright de Rockstar (logos, capturas ajenas). `og.png` (la imagen al compartir en redes) es un diseño propio.

## URL de la web y dominio propio

La URL pública está en **un único sitio**: la constante `SITE_URL` al principio de `build.js` (ahora `https://kaze389.github.io/gta6-guia/`). De ahí salen los canonical, Open Graph, schema, `sitemap.xml` y `robots.txt`. Los enlaces internos son relativos, así que funcionan en cualquier dominio.

Para pasar a un dominio propio (ejemplo: `guiagta6.es`):

1. En `build.js`, cambia `SITE_URL` a `"https://guiagta6.es/"` (con `/` final).
2. Ejecuta `node build.js`: al ver que no es un `github.io`, crea el archivo `CNAME` con el dominio (`guiagta6.es`). GitHub Pages usa ese archivo para saber qué dominio sirve. Si lo prefieres a mano, es un archivo de texto llamado `CNAME` en la raíz del repo con solo el dominio en una línea.
3. Haz commit y push (incluido `CNAME`).
4. En tu proveedor de dominio, crea los registros DNS:
   - Dominio raíz (`guiagta6.es`): registros `A` hacia `185.199.108.153`, `185.199.109.153`, `185.199.110.153` y `185.199.111.153`.
   - Subdominio (`www.guiagta6.es`): registro `CNAME` hacia `kaze389.github.io`.
5. En GitHub → Settings → Pages, comprueba que aparece el dominio y activa **Enforce HTTPS** cuando GitHub lo permita (puede tardar un rato).
6. En GoatCounter y Google Search Console, añade el dominio nuevo.

Las URLs antiguas de `github.io` redirigen solas al dominio propio.

## Analítica (GoatCounter, gratis y sin cookies)

Las visitas se cuentan con [GoatCounter](https://www.goatcounter.com): sin cookies y sin datos personales, así que no hace falta banner de cookies. Es gratis para un uso público razonable (una web personal como esta encaja). El código está en la constante `GOATCOUNTER` de `build.js` (`gta6-guia`), que envía los datos a `https://gta6-guia.goatcounter.com`.

Crear la cuenta (una vez):
1. Entra en https://www.goatcounter.com y pulsa **Sign up**.
2. En el código del sitio escribe **gta6-guia** (será `gta6-guia.goatcounter.com`). Rellena tu email y una contraseña. No pide tarjeta.
3. Confirma el email. A partir de ahí, cada visita a la web aparece en el panel `https://gta6-guia.goatcounter.com`.
4. Si `gta6-guia` ya estuviera cogido, elige otro código, cámbialo en `GOATCOUNTER`, ejecuta `node build.js` y haz commit.

Las visitas desde `localhost` no se cuentan. Para desactivar la analítica, deja `GOATCOUNTER = ""`.

## Google Search Console (gratis)

La página de inicio lleva la etiqueta `<meta name="google-site-verification" content="PENDIENTE">`. El valor sale de la constante `GSC_VERIFICACION` de `build.js`.

1. Entra en https://search.google.com/search-console con tu cuenta de Google y pulsa **Añadir propiedad**.
2. Elige **Prefijo de la URL** (no "Dominio": en `github.io` no puedes tocar el DNS) y escribe `https://kaze389.github.io/gta6-guia/`.
3. En los métodos de verificación, abre **Etiqueta HTML** y copia solo el valor de `content="..."` (una cadena larga de letras y números).
4. Pégalo en `GSC_VERIFICACION` (en lugar de `PENDIENTE`), ejecuta `node build.js`, haz commit y push, y espera a que GitHub Pages publique (1-2 minutos).
5. Vuelve a Search Console y pulsa **Verificar**. No quites la etiqueta después: Google la comprueba de vez en cuando.
6. Envía el sitemap: menú **Sitemaps** → escribe `sitemap.xml` → **Enviar**. Ahí verás cuántas URLs ha descubierto y, con los días, en **Rendimiento** verás las búsquedas por las que apareces (las mejores pistas para nuevas respuestas).
7. Para acelerar una página nueva: **Inspección de URLs** → pega la URL → **Solicitar indexación**.

## SEO: notas
- Cada página tiene su `title`, `description`, canonical, Open Graph y datos estructurados (WebSite, FAQPage, Article, BreadcrumbList).
- Mientras la web esté en `kaze389.github.io/gta6-guia/`, Google no lee `robots.txt` (solo lo busca en la raíz del dominio): por eso el sitemap se envía a mano en Search Console. Con dominio propio, `robots.txt` ya funciona (y habrá que crear una propiedad nueva en Search Console para el dominio).
