// Datos de la web. Todo el contenido vive aquí: después de editarlo, ejecuta `node build.js`
// para regenerar las páginas (y haz commit de data.js + los archivos generados).
// Regla: solo datos confirmados por Rockstar o por varias fuentes fiables. Nada de rumores.
window.GUIA = {
  actualizado: "2026-11-18",
  lanzamiento: "2026-11-19T00:00:00+01:00",

  datos: [
    { k: "Lanzamiento", v: "19 de noviembre de 2026" },
    { k: "Plataformas", v: "PS5 y Xbox Series X|S (PC sin anunciar)" },
    { k: "Ediciones", v: "Standard (79,99 $) y Ultimate (99,99 $, solo digital)" },
    { k: "Precarga", v: "Disponible desde el 12 de noviembre" },
    { k: "Espacio en PS5", v: "Mínimo 212 GB libres" },
    { k: "Protagonistas", v: "Jason Duval y Lucia Caminos" },
    { k: "Ambientación", v: "Estado de Leonida (inspirado en Florida), con Vice City" }
  ],

  // Checklist: cada categoría tiene items {id, t, nota?}. Los ids no se cambian nunca
  // (el progreso del usuario se guarda por id).
  checklist: [
    {
      cat: "Regiones de Leonida por visitar",
      items: [
        { id: "reg-vice-city", t: "Vice City" },
        { id: "reg-leonida-keys", t: "Leonida Keys" },
        { id: "reg-grassrivers", t: "Grassrivers" },
        { id: "reg-port-gellhorn", t: "Port Gellhorn" },
        { id: "reg-ambrosia", t: "Ambrosia" },
        { id: "reg-mount-kalaga", t: "Mount Kalaga" }
      ]
    },
    {
      cat: "Antes de empezar",
      items: [
        { id: "pre-espacio", t: "Liberar espacio (212 GB mínimo en PS5)" },
        { id: "pre-precarga", t: "Precargar el juego" },
        { id: "pre-bonus", t: "Canjear el Vintage Vice City Pack (bonus de reserva)" }
      ]
    },
    {
      cat: "Coleccionables",
      pendiente: true,
      items: []
    }
  ],

  faq: [
    { q: "¿Cuándo sale GTA VI?", a: "El jueves 19 de noviembre de 2026 en PS5 y Xbox Series X|S." },
    { q: "¿Sale en PC?", a: "Rockstar no ha anunciado versión de PC por ahora.", ver: "gta-6-sale-en-pc" },
    { q: "¿Cuánto ocupa?", a: "En PS5 se piden al menos 212 GB libres. En Xbox, consulta la ficha de la tienda en tu consola." },
    { q: "¿Qué edición compro?", a: "La Standard es el juego completo. La Ultimate (solo digital) añade vehículos, armas y ropa extra. Puedes pasar de Standard a Ultimate más adelante con una mejora." },
    { q: "¿La edición física trae disco?", a: "No: la versión física es un código de descarga dentro de la caja." }
  ],
  // En faq, "ver" (opcional) es el slug de una respuesta de /respuestas/ con más detalle.

  // Respuestas: una página por pregunta en /respuestas/<slug>/ (para búsquedas de cola larga).
  // Campos:
  //   slug         minúsculas, números y guiones. NO cambiarlo una vez publicado (es la URL).
  //   pregunta     tal como la buscaría la gente ("¿A qué hora sale GTA 6 en España?").
  //   respuesta    respuesta corta (1-3 frases). Se muestra arriba y se usa como meta description.
  //   explicacion  lista de párrafos con el detalle.
  //   fecha        AAAA-MM-DD de la última revisión.
  //   fuentes      [{ nombre, url }] (mínimo una; dos si no es Rockstar).
  //   relacionadas (opcional) slugs de otras respuestas a enlazar primero.
  //   titulo       (opcional) <title> distinto de la pregunta.
  respuestas: [
    {
      slug: "a-que-hora-sale-gta-6-en-espana",
      pregunta: "¿A qué hora sale GTA 6 en España?",
      titulo: "¿A qué hora sale GTA 6 en España? Hora exacta y Canarias",
      respuesta: "A las 00:00 del jueves 19 de noviembre de 2026, hora peninsular: justo en la medianoche del miércoles 18 al jueves 19. En Canarias se desbloquea a medianoche hora canaria, una hora después que en la península.",
      explicacion: [
        "GTA VI no se desbloquea a la vez en todo el mundo. Rockstar lo lanza a las 00:00 del 19 de noviembre en la hora local de cada país o región, tanto en PS5 como en Xbox Series X|S. Por eso en Nueva Zelanda se puede jugar muchas horas antes que en España.",
        "En la España peninsular y en Baleares esa medianoche llega al terminar el miércoles 18 (son las 23:00 UTC del día 18). Canarias va una hora por detrás, así que allí el juego se abre a las 00:00 hora canaria, que en la península ya son las 01:00.",
        "La precarga ya está abierta para quien tenga el juego reservado, también en la versión en caja (que trae un código de descarga, no un disco). Si lo dejas descargado antes, a medianoche solo tendrás que abrirlo; si no, te tocará bajar más de 200 GB en plena noche de lanzamiento."
      ],
      fecha: "2026-11-18",
      fuentes: [
        { nombre: "Vandal: GTA 6 confirma la hora exacta de lanzamiento", url: "https://vandal.elespanol.com/noticia/2026250032/gta-6-confirma-la-hora-exacta-para-su-lanzamiento-en-espana-y-el-resto-del-mundo/" },
        { nombre: "Hipertextual: horario de GTA 6 según la PS Store", url: "https://hipertextual.com/videojuegos/ya-es-oficial-gta-6-no-tendra-un-debut-simultaneo-en-todo-el-mundo-te-contamos-a-que-hora-podras-jugar/" }
      ],
      relacionadas: ["gta-6-sale-en-pc"]
    },
    {
      slug: "gta-6-sale-en-pc",
      pregunta: "¿GTA 6 sale en PC?",
      titulo: "¿GTA 6 sale en PC? Lo que hay confirmado",
      respuesta: "De momento, no. GTA VI sale el 19 de noviembre de 2026 solo en PS5 y Xbox Series X|S, y Rockstar no ha anunciado una versión de PC ni fecha para ella.",
      explicacion: [
        "La web oficial de Rockstar solo muestra PlayStation 5 y Xbox Series X|S como plataformas. No hay reservas abiertas para PC ni requisitos mínimos publicados.",
        "Lo que sí hay es un patrón: GTA V llegó a PC unos 19 meses después que a consolas (septiembre de 2013 → abril de 2015) y Red Dead Redemption 2, algo más de un año después (octubre de 2018 → noviembre de 2019). Por eso se espera que acabe llegando, pero cualquier fecha concreta que veas hoy es especulación, no un anuncio.",
        "Si juegas en PC, no compres hardware pensando en GTA VI hasta que Rockstar publique los requisitos oficiales. Actualizaremos esta página en cuanto haya anuncio."
      ],
      fecha: "2026-11-18",
      fuentes: [
        { nombre: "PC Gamer: GTA 6 se retrasa al 19 de noviembre (sin versión de PC anunciada)", url: "https://www.pcgamer.com/games/action/grand-theft-auto-6-is-delayed-to-november-these-extra-months-will-allow-us-to-finish-the-game-with-the-level-of-polish-you-have-come-to-expect-and-deserve" },
        { nombre: "tbreak: la web oficial solo lista PS5 y Xbox Series X|S", url: "https://tbreak.com/gta-6-pc-release-sooner-than-expected/" },
        { nombre: "Gfinity: historial de lanzamientos de Rockstar en PC", url: "https://www.gfinityesports.com/article/will-gta-6-be-on-pc-release-date-rockstar-news-and-2027-rumors" }
      ],
      relacionadas: ["a-que-hora-sale-gta-6-en-espana"]
    }
  ]
};
