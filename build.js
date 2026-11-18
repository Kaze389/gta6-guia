#!/usr/bin/env node
// build.js: genera la web estática a partir de data.js. Sin dependencias.
// Uso:  node build.js
//
// Genera: index.html, checklist/, faq/, respuestas/, 404.html, sitemap.xml, robots.txt
// (y CNAME si SITE_URL es un dominio propio). No edites esos archivos a mano: se sobrescriben.
"use strict";

// ================== CONFIGURACIÓN ==================
// Único sitio donde se define la URL pública. Termina siempre en "/".
// Con dominio propio: "https://tudominio.com/" (y build.js creará el archivo CNAME).
const SITE_URL = "https://kaze389.github.io/gta6-guia/";
// Código de GoatCounter (analítica sin cookies): cuenta en https://gta6-guia.goatcounter.com
// Déjalo vacío ("") para desactivar la analítica.
const GOATCOUNTER = "gta6-guia";
const SITE_NAME = "GTA VI en español";
// ===================================================

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
const DIRS_GENERADOS = ["checklist", "faq", "respuestas"]; // se borran y regeneran enteros
const KEY_PROGRESO = "gta6-guia-progreso"; // clave de localStorage: no cambiar
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FECHA_RE = /^\d{4}-\d{2}-\d{2}$/;

// ---------- Datos ----------
function cargarDatos() {
  const codigo = fs.readFileSync(path.join(ROOT, "data.js"), "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(codigo, sandbox, { filename: "data.js" });
  if (!sandbox.window.GUIA) throw new Error("data.js no define window.GUIA");
  return sandbox.window.GUIA;
}

function validar(G) {
  const err = [];
  const fechaOk = (f) => FECHA_RE.test(f || "") && !isNaN(Date.parse(f));
  if (!/^https:\/\/[^/]+\/(?:.*\/)?$/.test(SITE_URL)) err.push("SITE_URL debe empezar por https:// y terminar en /");
  if (!fechaOk(G.actualizado)) err.push("actualizado debe ser AAAA-MM-DD");
  if (isNaN(Date.parse(G.lanzamiento))) err.push("lanzamiento no es una fecha válida");

  const ids = new Set();
  (G.checklist || []).forEach((c) => {
    if (!c.cat) err.push("Hay una categoría de checklist sin 'cat'");
    (c.items || []).forEach((it) => {
      if (!SLUG_RE.test(it.id || "")) err.push(`id de checklist no válido: "${it.id}" (minúsculas, números y guiones)`);
      if (ids.has(it.id)) err.push(`id de checklist duplicado: "${it.id}"`);
      ids.add(it.id);
      if (!it.t) err.push(`El item "${it.id}" no tiene texto (t)`);
    });
  });

  const slugs = new Set((G.respuestas || []).map((r) => r.slug));
  const vistos = new Set();
  (G.respuestas || []).forEach((r) => {
    const n = r.slug || "(sin slug)";
    if (!SLUG_RE.test(r.slug || "")) err.push(`slug no válido: "${n}"`);
    if (vistos.has(r.slug)) err.push(`slug duplicado: "${n}"`);
    vistos.add(r.slug);
    if (!r.pregunta) err.push(`${n}: falta 'pregunta'`);
    if (!r.respuesta) err.push(`${n}: falta 'respuesta' (respuesta corta)`);
    if (!r.explicacion || !parrafos(r.explicacion).length) err.push(`${n}: falta 'explicacion'`);
    if (!fechaOk(r.fecha)) err.push(`${n}: 'fecha' debe ser AAAA-MM-DD`);
    if (!Array.isArray(r.fuentes) || !r.fuentes.length) err.push(`${n}: necesita al menos una fuente`);
    (r.fuentes || []).forEach((f) => {
      if (!f.nombre || !/^https?:\/\//.test(f.url || "")) err.push(`${n}: fuente mal formada (necesita nombre y url)`);
    });
    (r.relacionadas || []).forEach((s) => {
      if (!slugs.has(s)) err.push(`${n}: relacionada "${s}" no existe`);
      if (s === r.slug) err.push(`${n}: se enlaza a sí misma en relacionadas`);
    });
  });

  (G.faq || []).forEach((f) => {
    if (!f.q || !f.a) err.push("Hay una pregunta de faq sin 'q' o 'a'");
    if (f.ver && !slugs.has(f.ver)) err.push(`faq "${f.q}": 'ver' apunta a un slug que no existe ("${f.ver}")`);
  });
  return err;
}

// ---------- Utilidades ----------
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function parrafos(x) {
  return (Array.isArray(x) ? x : [x]).filter((p) => p && String(p).trim());
}
function recortar(texto, max) {
  const t = String(texto).replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const corte = t.slice(0, max - 1);
  return corte.slice(0, corte.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "") + "…";
}
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
function fechaLarga(iso) {
  const [a, m, d] = iso.split("-").map(Number);
  return `${d} de ${MESES[m - 1]} de ${a}`;
}
function anclaFaq(q) {
  return "q-" + q.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function jsonld(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
}
function porFecha(a, b) {
  return b.fecha.localeCompare(a.fecha) || a.pregunta.localeCompare(b.pregunta, "es");
}

// ---------- Plantilla ----------
const CSS = `:root{--bg:#0f0b1a;--card:#1a1430;--ink:#f4efff;--mute:#b6a9d6;--pink:#ff4fa3;--cyan:#3fe0ff;--line:#2e2550}
*{box-sizing:border-box}
body{margin:0;font:16px/1.55 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--ink)}
a{color:var(--cyan)}
header{padding:18px 20px 28px;text-align:center;background:linear-gradient(160deg,#3a0f4d 0%,#0f0b1a 55%,#06303d 100%)}
.top{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:0 0 22px}
.top a{color:var(--mute);text-decoration:none;font-size:.9rem;padding:5px 12px;border:1px solid var(--line);border-radius:99px;background:rgba(15,11,26,.45)}
.top a[aria-current]{color:var(--ink);border-color:var(--pink)}
h1{margin:0 0 6px;font-size:clamp(1.8rem,6vw,2.8rem);letter-spacing:-.02em}
h1.p{font-size:clamp(1.5rem,5vw,2.2rem)}
h1 span{background:linear-gradient(90deg,var(--pink),var(--cyan));-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{color:var(--mute);margin:0}
#cuenta{margin-top:18px;font-size:1.15rem;font-weight:600;color:var(--cyan)}
main{max-width:760px;margin:0 auto;padding:8px 16px 48px}
section{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:18px 18px 10px;margin:18px 0}
h2{margin:0 0 12px;font-size:1.25rem}
dl{display:grid;grid-template-columns:max-content 1fr;gap:6px 14px;margin:0 0 8px}
dt{color:var(--mute)}dd{margin:0}
.bar{height:10px;background:var(--line);border-radius:99px;overflow:hidden;margin:4px 0 14px}
.bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--pink),var(--cyan));transition:width .3s}
h3{font-size:1rem;margin:16px 0 6px;color:var(--pink)}
label{display:flex;gap:10px;align-items:flex-start;padding:7px 0;border-bottom:1px solid var(--line);cursor:pointer}
input[type=checkbox]{width:20px;height:20px;accent-color:var(--pink);flex:none;margin-top:2px}
label.done span{color:var(--mute);text-decoration:line-through}
.pend{color:var(--mute);font-style:italic;margin:4px 0 10px}
details{border-bottom:1px solid var(--line);padding:9px 0}
summary{cursor:pointer;font-weight:600}
details p{margin:6px 0 2px;color:var(--mute)}
button{background:none;border:1px solid var(--line);color:var(--mute);border-radius:8px;padding:6px 10px;cursor:pointer;margin:8px 0}
.btn{display:inline-block;margin:4px 0 10px;padding:8px 14px;border-radius:10px;background:linear-gradient(90deg,var(--pink),#c23bd4);color:#fff;text-decoration:none;font-weight:600}
.lista{list-style:none;margin:0;padding:0}
.lista li{padding:9px 0;border-bottom:1px solid var(--line)}
.lista li:last-child{border-bottom:0}
.lista a{font-weight:600;text-decoration:none}
.lista p{margin:3px 0 0;color:var(--mute);font-size:.95rem}
.corta{border-left:4px solid var(--pink);background:#231a3f;border-radius:0 10px 10px 0;padding:12px 14px;margin:0 0 14px;font-size:1.05rem}
.meta{color:var(--mute);font-size:.88rem}
.migas{font-size:.85rem;color:var(--mute);margin:0 0 10px}
.migas a{color:var(--mute)}
ul.fuentes{padding-left:20px;margin:0 0 10px}
ul.fuentes li{margin:4px 0}
footer{text-align:center;color:var(--mute);font-size:.85rem;padding:0 16px 32px}
footer a{color:var(--mute)}`;

const FAVICON = "data:image/svg+xml," + encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><defs><linearGradient id='g' x2='1'><stop offset='0' stop-color='#ff4fa3'/><stop offset='1' stop-color='#3fe0ff'/></linearGradient></defs><rect width='64' height='64' rx='14' fill='url(#g)'/><text x='32' y='43' font-size='28' text-anchor='middle' font-family='sans-serif' font-weight='700' fill='#0f0b1a'>VI</text></svg>"
);

const NAV = [
  ["", "Inicio"],
  ["checklist/", "Checklist"],
  ["respuestas/", "Respuestas"],
  ["faq/", "FAQ"],
];

function pagina(G, o) {
  // o: { ruta, titulo, descripcion, h1, sub?, cabecera?, cuerpo, schema?, tipo?, publicado?, modificado?, noindex?, scripts?, base? }
  const prof = o.ruta.split("/").filter(Boolean).length;
  const base = o.base || (prof ? "../".repeat(prof) : "./");
  const url = SITE_URL + o.ruta;
  const img = SITE_URL + "og.png";
  const tipo = o.tipo || "website";
  const seccion = NAV.map((n) => n[0]).filter(Boolean).find((r) => o.ruta.startsWith(r)) || "";

  const meta = [
    `<title>${esc(o.titulo)}</title>`,
    `<meta name="description" content="${esc(o.descripcion)}">`,
  ];
  if (o.noindex) {
    meta.push(`<meta name="robots" content="noindex">`);
  } else {
    meta.push(
      `<link rel="canonical" href="${esc(url)}">`,
      `<meta property="og:type" content="${tipo}">`,
      `<meta property="og:site_name" content="${esc(SITE_NAME)}">`,
      `<meta property="og:locale" content="es_ES">`,
      `<meta property="og:title" content="${esc(o.titulo)}">`,
      `<meta property="og:description" content="${esc(o.descripcion)}">`,
      `<meta property="og:url" content="${esc(url)}">`,
      `<meta property="og:image" content="${esc(img)}">`,
      `<meta property="og:image:width" content="1200">`,
      `<meta property="og:image:height" content="630">`,
      `<meta property="og:image:alt" content="${esc(SITE_NAME)}: guía, checklist y respuestas rápidas">`,
      `<meta name="twitter:card" content="summary_large_image">`
    );
    if (tipo === "article") {
      meta.push(
        `<meta property="article:published_time" content="${o.publicado}">`,
        `<meta property="article:modified_time" content="${o.modificado}">`
      );
    }
  }
  if (o.schema) meta.push(jsonld(o.schema));

  const analitica = GOATCOUNTER
    ? `\n<script data-goatcounter="https://${GOATCOUNTER}.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>`
    : "";

  return `<!DOCTYPE html>
<!-- Generado por build.js a partir de data.js. No editar a mano. -->
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${meta.join("\n")}
<meta name="theme-color" content="#0f0b1a">
<link rel="icon" href="${FAVICON}">
<style>
${CSS}
</style>
</head>
<body>
<header>
  <nav class="top" aria-label="Secciones">
${NAV.map(([r, t]) => `    <a href="${base}${r}"${r === seccion ? ' aria-current="page"' : ""}>${t}</a>`).join("\n")}
  </nav>
  <h1${o.ruta ? ' class="p"' : ""}>${o.h1}</h1>
${o.sub ? `  <p class="sub">${o.sub}</p>\n` : ""}${o.cabecera || ""}</header>
<main>
${o.cuerpo}
</main>
<footer>
  <p>Actualizado: <time datetime="${G.actualizado}">${fechaLarga(G.actualizado)}</time>. Solo publicamos datos confirmados por Rockstar o por varias fuentes fiables.</p>
  <p>Web de fans, sin relación con Rockstar Games ni Take-Two. GTA y Grand Theft Auto son marcas de sus propietarios.</p>${GOATCOUNTER ? "\n  <p>Contamos visitas de forma anónima con GoatCounter, sin cookies.</p>" : ""}
</footer>${o.scripts ? "\n" + o.scripts : ""}${analitica}
</body>
</html>
`;
}

// ---------- Bloques reutilizables ----------
function idsChecklist(G) {
  return G.checklist.flatMap((c) => c.items.map((it) => it.id));
}

function listaRespuestas(base, lista) {
  return `<ul class="lista">
${lista.map((r) => `  <li><a href="${base}respuestas/${r.slug}/">${esc(r.pregunta)}</a><p>${esc(recortar(r.respuesta, 140))}</p></li>`).join("\n")}
</ul>`;
}

// ---------- Páginas ----------
function paginaInicio(G) {
  const ids = idsChecklist(G);
  const ultimas = [...G.respuestas].sort(porFecha).slice(0, 6);
  const cuerpo = `  <section>
    <h2>Datos clave</h2>
    <dl>
${G.datos.map((d) => `      <dt>${esc(d.k)}</dt><dd>${esc(d.v)}</dd>`).join("\n")}
    </dl>
  </section>

  <section>
    <h2>Tu checklist</h2>
    <div id="pct" class="sub">${ids.length} objetivos para marcar</div>
    <div class="bar"><i id="barra"></i></div>
    <p class="sub">Regiones de Leonida, preparativos y coleccionables. Tu progreso se guarda en este navegador.</p>
    <a class="btn" href="./checklist/">Abrir mi checklist</a>
  </section>
${ultimas.length ? `
  <section>
    <h2>Respuestas rápidas</h2>
    ${listaRespuestas("./", ultimas)}
    <p><a href="./respuestas/">Ver todas las respuestas</a></p>
  </section>
` : ""}
  <section>
    <h2>Preguntas frecuentes</h2>
    <ul class="lista">
${G.faq.map((f) => `      <li><a href="./faq/#${anclaFaq(f.q)}">${esc(f.q)}</a></li>`).join("\n")}
    </ul>
  </section>`;

  const scripts = `<script>
(function(){
  // Cuenta atrás
  var c = document.getElementById("cuenta"), fin = new Date(c.getAttribute("data-fin")).getTime();
  function tick(){
    var d = fin - Date.now();
    if (d <= 0){ c.textContent = "¡Ya disponible en PS5 y Xbox Series X|S!"; return; }
    var h = Math.floor(d/36e5), m = Math.floor(d%36e5/6e4), s = Math.floor(d%6e4/1e3);
    c.textContent = "Sale en " + (h>=24 ? Math.floor(h/24)+" d "+(h%24)+" h" : h+" h "+m+" min "+s+" s");
    setTimeout(tick, 1000);
  }
  tick();
  // Resumen del progreso guardado
  var ids = ${JSON.stringify(ids)}, prog = {};
  try { prog = JSON.parse(localStorage.getItem(${JSON.stringify(KEY_PROGRESO)})) || {}; } catch(e) {}
  var hechos = ids.filter(function(id){ return prog[id]; }).length;
  if (hechos){
    var pct = Math.round(hechos*100/ids.length);
    document.getElementById("pct").textContent = hechos+" de "+ids.length+" completados ("+pct+" %)";
    document.getElementById("barra").style.width = pct+"%";
  }
})();
</script>`;

  return pagina(G, {
    ruta: "",
    titulo: "GTA VI en español: checklist, fecha, precio y guía rápida",
    descripcion: "Guía de GTA VI en español: checklist con tu progreso guardado, regiones de Leonida, fecha de lanzamiento, ediciones, espacio necesario y preguntas frecuentes.",
    h1: "<span>GTA VI</span> en español",
    sub: "Checklist con tu progreso guardado, datos clave y respuestas rápidas",
    cabecera: `  <div id="cuenta" data-fin="${esc(G.lanzamiento)}"></div>\n`,
    cuerpo,
    scripts,
    schema: { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL, inLanguage: "es" },
  });
}

function paginaChecklist(G) {
  const lista = G.checklist.map((c) => {
    const h = `      <h3>${esc(c.cat)}</h3>`;
    if (!c.items.length) {
      return h + `\n      <p class="pend">${c.pendiente ? "Lo añadiremos en cuanto se confirmen tras el lanzamiento." : ""}</p>`;
    }
    return h + "\n" + c.items.map((it) =>
      `      <label><input type="checkbox" data-id="${esc(it.id)}"><span>${esc(it.t)}${it.nota ? " — " + esc(it.nota) : ""}</span></label>`
    ).join("\n");
  }).join("\n");
  const total = idsChecklist(G).length;

  const cuerpo = `  <section>
    <h2>Tu progreso</h2>
    <div id="pct" class="sub">0 de ${total} completados (0 %)</div>
    <div class="bar"><i id="barra"></i></div>
    <div id="lista">
${lista}
    </div>
    <button id="reset" type="button">Borrar mi progreso</button>
  </section>

  <section>
    <h2>¿Dudas antes de empezar?</h2>
    ${listaRespuestas("../", [...G.respuestas].sort(porFecha).slice(0, 4))}
    <p><a href="../faq/">Preguntas frecuentes</a></p>
  </section>`;

  const scripts = `<script>
(function(){
  var KEY = ${JSON.stringify(KEY_PROGRESO)}, prog = {};
  try { prog = JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e) {}
  function guardar(){ try { localStorage.setItem(KEY, JSON.stringify(prog)); } catch(e) {} }
  var lista = document.getElementById("lista");
  var cajas = [].slice.call(lista.querySelectorAll("input[data-id]"));
  function pintar(){
    var hechos = 0;
    cajas.forEach(function(c){
      var ok = !!prog[c.getAttribute("data-id")];
      c.checked = ok; c.parentNode.className = ok ? "done" : "";
      if (ok) hechos++;
    });
    var total = cajas.length, pct = total ? Math.round(hechos*100/total) : 0;
    document.getElementById("pct").textContent = hechos+" de "+total+" completados ("+pct+" %)";
    document.getElementById("barra").style.width = pct+"%";
  }
  lista.addEventListener("change", function(e){
    var id = e.target.getAttribute("data-id"); if (!id) return;
    if (e.target.checked) prog[id] = 1; else delete prog[id];
    guardar(); pintar();
  });
  document.getElementById("reset").addEventListener("click", function(){ prog = {}; guardar(); pintar(); });
  pintar();
})();
</script>`;

  return pagina(G, {
    ruta: "checklist/",
    titulo: "Checklist de GTA VI: regiones de Leonida y preparativos",
    descripcion: `Checklist de GTA VI con ${total} objetivos: regiones de Leonida, qué hacer antes de empezar y coleccionables. Tu progreso se guarda en el navegador.`,
    h1: "Checklist de <span>GTA VI</span>",
    sub: "Marca lo que vas completando: se guarda en este navegador, sin registrarte",
    cuerpo,
    scripts,
  });
}

function paginaFaq(G) {
  const cuerpo = `  <section>
    <h2>Preguntas frecuentes</h2>
${G.faq.map((f) => `    <details id="${anclaFaq(f.q)}"><summary>${esc(f.q)}</summary><p>${esc(f.a)}${f.ver ? ` <a href="../respuestas/${f.ver}/">Más detalles</a>` : ""}</p></details>`).join("\n")}
  </section>
${G.respuestas.length ? `
  <section>
    <h2>Respuestas con más detalle</h2>
    ${listaRespuestas("../", [...G.respuestas].sort(porFecha))}
  </section>
` : ""}`;

  const scripts = `<script>
// Abre la pregunta enlazada con #ancla
(function(){ var d = location.hash && document.getElementById(location.hash.slice(1)); if (d && d.tagName === "DETAILS") d.open = true; })();
</script>`;

  return pagina(G, {
    ruta: "faq/",
    titulo: "Preguntas frecuentes de GTA VI: fecha, PC, espacio y ediciones",
    descripcion: recortar("Respuestas rápidas a las dudas más buscadas sobre GTA VI: " + G.faq.map((f) => { const q = f.q.replace(/[¿?]/g, ""); return q.charAt(0).toLowerCase() + q.slice(1); }).join(", ") + ".", 158),
    h1: "Preguntas frecuentes de <span>GTA VI</span>",
    sub: "Lo más buscado, contestado en una línea",
    cuerpo,
    scripts,
    schema: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: "es",
      mainEntity: G.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  });
}

function paginaIndiceRespuestas(G) {
  const lista = [...G.respuestas].sort(porFecha);
  const cuerpo = `  <section>
    <h2>Todas las respuestas</h2>
    ${lista.length ? listaRespuestas("../", lista) : '<p class="pend">Pronto añadiremos respuestas.</p>'}
  </section>
  <section>
    <h2>Más en la guía</h2>
    <ul class="lista">
      <li><a href="../checklist/">Checklist de GTA VI con tu progreso guardado</a></li>
      <li><a href="../faq/">Preguntas frecuentes</a></li>
    </ul>
  </section>`;
  return pagina(G, {
    ruta: "respuestas/",
    titulo: "Respuestas rápidas sobre GTA VI en español",
    descripcion: "Respuestas cortas y con fuentes a las dudas concretas sobre GTA VI: horarios, plataformas, ediciones, espacio y más. Actualizadas con datos confirmados.",
    h1: "Respuestas sobre <span>GTA VI</span>",
    sub: "Una pregunta, una respuesta corta y sus fuentes",
    cuerpo,
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Respuestas rápidas sobre GTA VI",
      url: SITE_URL + "respuestas/",
      inLanguage: "es",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: lista.map((r, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}respuestas/${r.slug}/`, name: r.pregunta })),
      },
    },
  });
}

function relacionadasDe(G, r, max) {
  const porSlug = Object.fromEntries(G.respuestas.map((x) => [x.slug, x]));
  const elegidas = (r.relacionadas || []).map((s) => porSlug[s]);
  const resto = [...G.respuestas].sort(porFecha).filter((x) => x.slug !== r.slug && !elegidas.includes(x));
  return elegidas.concat(resto).slice(0, max);
}

function paginaRespuesta(G, r) {
  const ruta = `respuestas/${r.slug}/`;
  const url = SITE_URL + ruta;
  const rel = relacionadasDe(G, r, 5);
  const desc = recortar(r.respuesta, 158);
  const publicado = r.publicada || r.fecha;

  const cuerpo = `  <section>
    <p class="migas"><a href="../../">Inicio</a> › <a href="../">Respuestas</a></p>
    <p class="corta"><strong>Respuesta corta:</strong> ${esc(r.respuesta)}</p>
    <h2>Explicación</h2>
${parrafos(r.explicacion).map((p) => `    <p>${esc(p)}</p>`).join("\n")}
    <h2>Fuentes</h2>
    <ul class="fuentes">
${r.fuentes.map((f) => `      <li><a href="${esc(f.url)}" rel="noopener">${esc(f.nombre)}</a></li>`).join("\n")}
    </ul>
    <p class="meta">Revisado el <time datetime="${r.fecha}">${fechaLarga(r.fecha)}</time>. Si algo cambia, actualizamos esta página.</p>
  </section>

  <section>
    <h2>Respuestas relacionadas</h2>
    ${rel.length ? listaRespuestas("../../", rel) : ""}
    <ul class="lista">
      <li><a href="../../checklist/">Checklist de GTA VI con tu progreso guardado</a></li>
      <li><a href="../../faq/">Preguntas frecuentes</a></li>
    </ul>
  </section>`;

  const organizacion = { "@type": "Organization", name: SITE_NAME, url: SITE_URL };
  return pagina(G, {
    ruta,
    titulo: r.titulo || `${r.pregunta} | ${SITE_NAME}`,
    descripcion: desc,
    h1: esc(r.pregunta),
    cuerpo,
    tipo: "article",
    publicado,
    modificado: r.fecha,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          headline: recortar(r.pregunta, 110),
          description: desc,
          inLanguage: "es",
          datePublished: publicado,
          dateModified: r.fecha,
          mainEntityOfPage: url,
          url,
          image: SITE_URL + "og.png",
          author: organizacion,
          publisher: organizacion,
          citation: r.fuentes.map((f) => f.url),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Respuestas", item: SITE_URL + "respuestas/" },
            { "@type": "ListItem", position: 3, name: r.pregunta, item: url },
          ],
        },
      ],
    },
  });
}

function pagina404(G) {
  // GitHub Pages sirve 404.html en cualquier ruta: los enlaces tienen que ser absolutos.
  const base = new URL(SITE_URL).pathname;
  return pagina(G, {
    ruta: "404.html",
    base,
    noindex: true,
    titulo: `Página no encontrada | ${SITE_NAME}`,
    descripcion: "Esta página no existe.",
    h1: "Página no encontrada",
    sub: "Puede que la dirección haya cambiado",
    cuerpo: `  <section>
    <p>Prueba desde aquí:</p>
    <ul class="lista">
      <li><a href="${base}">Inicio</a></li>
      <li><a href="${base}checklist/">Checklist</a></li>
      <li><a href="${base}respuestas/">Respuestas</a></li>
      <li><a href="${base}faq/">Preguntas frecuentes</a></li>
    </ul>
  </section>`,
  });
}

function sitemap(G) {
  const maxResp = G.respuestas.map((r) => r.fecha).sort().pop();
  const urls = [
    ["", G.actualizado],
    ["checklist/", G.actualizado],
    ["faq/", G.actualizado],
    ["respuestas/", [G.actualizado, maxResp].filter(Boolean).sort().pop()],
    ...[...G.respuestas].sort(porFecha).map((r) => [`respuestas/${r.slug}/`, r.fecha]),
  ];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([r, f]) => `  <url><loc>${esc(SITE_URL + r)}</loc><lastmod>${f}</lastmod></url>`).join("\n")}
</urlset>
`;
}

function robots() {
  return `User-agent: *
Allow: /

Sitemap: ${SITE_URL}sitemap.xml
`;
}

// ---------- Escritura ----------
function escribir(rel, contenido) {
  const destino = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, contenido);
  return rel;
}

function main() {
  const G = cargarDatos();
  G.respuestas = G.respuestas || [];
  const errores = validar(G);
  if (errores.length) {
    console.error("data.js tiene errores, no se ha generado nada:\n- " + errores.join("\n- "));
    process.exit(1);
  }

  DIRS_GENERADOS.forEach((d) => fs.rmSync(path.join(ROOT, d), { recursive: true, force: true }));

  const hechos = [
    escribir("index.html", paginaInicio(G)),
    escribir("checklist/index.html", paginaChecklist(G)),
    escribir("faq/index.html", paginaFaq(G)),
    escribir("respuestas/index.html", paginaIndiceRespuestas(G)),
    ...G.respuestas.map((r) => escribir(`respuestas/${r.slug}/index.html`, paginaRespuesta(G, r))),
    escribir("404.html", pagina404(G)),
    escribir("sitemap.xml", sitemap(G)),
    escribir("robots.txt", robots()),
  ];

  // Dominio propio: GitHub Pages necesita un archivo CNAME con el dominio.
  const host = new URL(SITE_URL).hostname;
  const cnamePath = path.join(ROOT, "CNAME");
  if (!host.endsWith(".github.io")) {
    hechos.push(escribir("CNAME", host + "\n"));
  } else if (fs.existsSync(cnamePath)) {
    console.warn(`Aviso: existe CNAME (${fs.readFileSync(cnamePath, "utf8").trim()}) pero SITE_URL apunta a ${host}. Cambia SITE_URL en build.js.`);
  }

  console.log(`OK: ${hechos.length} archivos generados para ${SITE_URL}`);
  hechos.forEach((h) => console.log("  " + h));
}

main();
