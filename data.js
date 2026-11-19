// Datos de la web. Todo el contenido vive aquí: después de editarlo, ejecuta `node build.js`
// para regenerar las páginas (y haz commit de data.js + los archivos generados).
// Regla: solo datos confirmados por Rockstar o por varias fuentes fiables. Nada de rumores.
window.GUIA = {
  actualizado: "2026-11-19",
  lanzamiento: "2026-11-19T00:00:00+01:00",

  datos: [
    { k: "Lanzamiento", v: "19 de noviembre de 2026 (ya disponible)" },
    { k: "Plataformas", v: "PS5 y Xbox Series X|S (PC sin anunciar)" },
    { k: "Ediciones", v: "Standard (79,99 $) y Ultimate (99,99 $, solo digital)" },
    { k: "Modo online", v: "No al lanzamiento: es solo para un jugador" },
    { k: "Trofeos y logros", v: "55 (platino incluido en PS5; 1.000 G en Xbox)" },
    { k: "Espacio necesario", v: "Hasta 212 GB libres, según la consola" },
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
        { id: "pre-espacio", t: "Liberar espacio (hasta 212 GB, según la consola)" },
        { id: "pre-precarga", t: "Precargar el juego" },
        { id: "pre-bonus", t: "Canjear el Vintage Vice City Pack (bonus de reserva)" }
      ]
    },
    {
      cat: "Coleccionables",
      items: [
        { id: "col-cartas", t: "Colecciones de cartas (18 en total)", nota: "para el 100% bastan 15 completas" },
        { id: "col-flamencos-cocaina", t: "Flamencos de cocaína (125)", nota: "100 para el 100%" },
        { id: "col-waink", t: "Lugares para fotografiar con WAiNK (100)" },
        { id: "col-revistas-libros-comics", t: "Revistas, libros y cómics (34)", nota: "30 para el 100%" },
        { id: "col-meditacion", t: "Puntos de meditación (18)", nota: "15 para el 100%" },
        { id: "col-descubrimientos-submarinos", t: "Descubrimientos submarinos (33)" },
        { id: "col-acrobacias", t: "Acrobacias (397)", nota: "300 para el 100%; el trofeo de acrobacias pide 250" },
        { id: "col-canastas", t: "Canastas de baloncesto (100)", nota: "90 para el 100%" }
      ]
    },
    {
      cat: "Actividades y registros para el 100%",
      items: [
        { id: "act-carreras-drones", t: "Contrarrelojes de dron (42)", nota: "14 lugares con 3 pruebas cada uno" },
        { id: "act-galerias-tiro-oro", t: "Medallas de oro en las galerías de tiro (42)" },
        { id: "act-retos", t: "Retos (80)", nota: "70 para el 100%" },
        { id: "act-cacerias-bret", t: "Encargos de caza de Bret (15)" },
        { id: "act-videojuegos", t: "Videojuegos dentro del juego (4)" },
        { id: "reg-estilos", t: "Estilos de pelo, maquillaje y tatuajes (79)", nota: "70 para el 100%" },
        { id: "reg-vehiculos-escaneados", t: "Modelos de vehículo escaneados (277)", nota: "200 para el 100%" },
        { id: "reg-armas", t: "Armas registradas (66)", nota: "50 para el 100%" },
        { id: "reg-animales", t: "Animales estudiados (255)", nota: "100 para el 100%" }
      ]
    }
  ],

  faq: [
    { q: "¿Cuándo sale GTA VI?", a: "El jueves 19 de noviembre de 2026 en PS5 y Xbox Series X|S." },
    { q: "¿Sale en PC?", a: "Rockstar no ha anunciado versión de PC por ahora.", ver: "gta-6-sale-en-pc" },
    { q: "¿Sale en PS4 o Xbox One?", a: "No hay versión para PS4 ni Xbox One. En Xbox One solo se podrá jugar en streaming con Xbox Cloud Gaming, con los ajustes gráficos de Xbox Series S.", ver: "requisitos-y-plataformas-gta-6" },
    { q: "¿Cuánto ocupa?", a: "Rockstar pide hasta 212 GB libres, según la consola (PS5 o Xbox Series X|S).", ver: "no-tengo-espacio-para-gta-6" },
    { q: "¿Qué edición compro?", a: "La Standard es el juego completo. La Ultimate (solo digital) añade vehículos, armas y ropa extra. Puedes pasar de Standard a Ultimate más adelante con una mejora." },
    { q: "¿La edición física trae disco?", a: "No: la versión física es un código de descarga dentro de la caja." },
    { q: "¿GTA VI tiene modo online?", a: "No al lanzamiento: GTA VI sale como juego para un jugador, y Rockstar no ha dado fecha para un modo online. GTA Online sigue funcionando dentro de GTA V." },
    { q: "¿Cuántos trofeos y logros tiene?", a: "55: en PS5 son 1 platino, 2 de oro, 6 de plata y 46 de bronce; en Xbox suman 1.000 G. Muchos están ligados a la historia y vienen ocultos para no hacer spoilers." },
    { q: "¿Cuántos coleccionables hay y qué hace falta para el 100%?", a: "Hay 18 colecciones de cartas, 125 flamencos de cocaína, 100 lugares para WAiNK, 34 revistas, libros y cómics, 18 puntos de meditación, 33 descubrimientos submarinos, 397 acrobacias y 100 canastas. Para el 100% no hace falta todo (por ejemplo, 15 colecciones de cartas o 100 flamencos): lo tienes desglosado en la checklist." },
    { q: "¿Hay parche del día uno?", a: "Sí. Antes del lanzamiento llegaron dos actualizaciones obligatorias: la 1.002.000 (13 de noviembre) y la 1.002.001 (16 de noviembre), de alrededor de 1-2 GB según la consola. Rockstar no ha publicado notas del parche." }
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
      slug: "no-tengo-espacio-para-gta-6",
      pregunta: "No tengo espacio para GTA 6: ¿qué hago?",
      titulo: "No tengo espacio para GTA 6: cuánto ocupa y cómo liberar espacio",
      respuesta: "GTA VI necesita hasta 212 GB libres, según la consola. Borra lo que no juegues, mueve juegos a un disco USB (sirve para guardarlos, no para jugarlos) o amplía el almacenamiento interno: un SSD M.2 compatible en PS5 o una tarjeta de expansión oficial en Xbox Series X|S.",
      explicacion: [
        "Cuánto ocupa: según la página de soporte de Rockstar, la precarga pide hasta 212 GB de espacio disponible, y la cifra exacta depende de la consola. Comprar la edición en caja no te ahorra nada: dentro hay un código, no un disco, así que el juego se descarga entero igual. Deja además algo de margen libre, porque los parches también ocupan.",
        "Cuánto espacio tienes de verdad: una PS5 original de 825 GB deja unos 667 GB útiles y una Xbox Series S de 512 GB, unos 364 GB. Es decir, GTA VI se queda con alrededor de un tercio del disco en la PS5 original y con más de la mitad en la Series S. Revisa lo que tienes instalado en Ajustes > Almacenamiento (PS5) o en Configuración > Sistema > Dispositivos de almacenamiento (Xbox).",
        "Opción 1, borrar lo que no juegas: es lo más rápido y no cuesta nada. Por lo general, borrar un juego no elimina tus partidas guardadas: en PS5 se quedan en la consola (y en la nube si tienes PS Plus) y en Xbox se sincronizan en la nube, así que al reinstalarlo sigues donde lo dejaste.",
        "Opción 2, mover juegos a un disco USB: las dos consolas admiten un disco externo como almacén. Mueves ahí los juegos que no estás usando y los recuperas después, más rápido que volver a descargarlos. Pero los juegos de PS5 y los optimizados para Xbox Series X|S no se pueden jugar desde el USB: hay que devolverlos al almacenamiento interno. En PS5 el disco debe ser SuperSpeed USB y de entre 250 GB y 8 TB; en Xbox, USB 3.0 o superior y de 128 GB como mínimo.",
        "Opción 3, ampliar el almacenamiento donde sí se juega: en PS5, la ranura de expansión acepta un SSD M.2 que cumpla los requisitos de Sony. Tiene que ser NVMe con interfaz PCI-Express Gen4 x4 (Key M), de 250 GB a 8 TB, en formato 2230, 2242, 2260, 2280 o 22110, y con disipador o estructura de refrigeración (ancho máximo de 25 mm, disipador incluido). Sony recomienda una lectura secuencial de 5.500 MB/s o más y pide actualizar el software de la consola antes de instalarlo. En Xbox Series X|S, los juegos optimizados solo se juegan desde el SSD interno o desde una tarjeta de expansión de almacenamiento oficial con licencia para Xbox; un SSD USB normal no vale para jugarlos.",
        "No recomendamos modelos concretos: antes de comprar, comprueba en la ficha del fabricante que cumple todos estos requisitos."
      ],
      fecha: "2026-11-18",
      fuentes: [
        { nombre: "Rockstar Support: preguntas frecuentes sobre la precarga de GTA VI", url: "https://support.rockstargames.com/articles/7nPqOA2uCbpEQHXx7KVrYd" },
        { nombre: "PlayStation: cómo agregar un SSD M.2 a una consola PS5", url: "https://www.playstation.com/es-es/support/hardware/ps5-install-m2-ssd/" },
        { nombre: "PlayStation: almacenamiento adicional para PS5 y PS4", url: "https://www.playstation.com/es-es/accessories/external-storage/" },
        { nombre: "Xbox Wire: opciones de almacenamiento de Xbox Series X|S", url: "https://news.xbox.com/en-us/2020/09/24/xbox-series-x-and-xbox-series-s-custom-storage-solution-primer/" },
        { nombre: "Seagate: usar un disco USB externo con Xbox Series X|S", url: "https://www.seagate.com/in/en/support/kb/using-an-external-usb-drive-with-an-xbox-series-x-or-s/" },
        { nombre: "GTABase: guía de preparación (espacio útil de Xbox Series S)", url: "https://www.gtabase.com/articles/gta-6/gta-6-launch-prep-guide-pre-load-date-storage-editions" }
      ],
      relacionadas: ["requisitos-y-plataformas-gta-6", "a-que-hora-sale-gta-6-en-espana"]
    },
    {
      slug: "requisitos-y-plataformas-gta-6",
      pregunta: "¿Cuáles son los requisitos y plataformas de GTA 6?",
      titulo: "Requisitos y plataformas de GTA 6: consolas, 30 FPS y espacio",
      respuesta: "GTA VI sale en PS5 (incluida PS5 Pro) y Xbox Series X|S. No hay versión de PC, PS4 ni Xbox One, aunque en Xbox One se podrá jugar en streaming con Xbox Cloud Gaming. Necesitas hasta 212 GB libres y el juego apunta a 30 FPS en todas las consolas.",
      explicacion: [
        "Consolas: es un juego solo de la generación actual. Funciona en cualquier PS5, incluida la PS5 Pro, y en Xbox Series X y Series S. Rockstar no ha anunciado versión de PC.",
        "Rendimiento: Rockstar ha confirmado que GTA VI apunta a 30 FPS en PS5, PS5 Pro y Xbox Series X|S, sin modo de 60 FPS anunciado. Tampoco ha publicado la resolución de cada consola ni ha detallado qué recortes gráficos tiene la Series S.",
        "Diferencias entre consolas: en PS5 Pro la imagen es más nítida gracias a PSSR (el reescalado de Sony) y hay sombras con trazado de rayos que no tiene ninguna otra consola. Todas las PS5 aprovechan la vibración háptica del DualSense, el audio 3D Tempest y cargas más rápidas.",
        "Jugar sin estar delante de la consola: GTA VI admite Remote Play en PlayStation y en Xbox. Además, se podrá jugar en streaming con Xbox Cloud Gaming en Xbox Series X|S y Xbox One, siempre con los ajustes gráficos de Xbox Series S; la calidad dependerá de tu conexión.",
        "Espacio: la precarga necesita hasta 212 GB libres según la consola, y la edición en caja también se descarga entera porque trae un código, no un disco. Si vas justo de espacio, mira cómo liberarlo en la respuesta relacionada."
      ],
      fecha: "2026-11-18",
      fuentes: [
        { nombre: "Rockstar Support: preguntas frecuentes sobre la precarga de GTA VI", url: "https://support.rockstargames.com/articles/7nPqOA2uCbpEQHXx7KVrYd" },
        { nombre: "Thurrott: Rockstar detalla las mejoras de PS5 Pro y Xbox Cloud Gaming", url: "https://www.thurrott.com/?p=343700" },
        { nombre: "Notebookcheck: objetivos de rendimiento de GTA 6 en consola", url: "https://notebookcheck.net/Rockstar-reveals-GTA-6-console-performance-targets-and-PS5-Pro-upgrades.1447121.0.html" },
        { nombre: "KitGuru: 30 FPS, PS5 Pro y Remote Play", url: "https://www.kitguru.net/?p=751421" }
      ],
      relacionadas: ["no-tengo-espacio-para-gta-6", "gta-6-sale-en-pc"]
    },
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
      relacionadas: ["no-tengo-espacio-para-gta-6", "gta-6-sale-en-pc"]
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
      relacionadas: ["requisitos-y-plataformas-gta-6", "a-que-hora-sale-gta-6-en-espana"]
    }
  ]
};
