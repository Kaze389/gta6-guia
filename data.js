// Datos de la web. La tarea semanal SOLO edita este archivo (y CHANGELOG.md).
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
    { q: "¿Sale en PC?", a: "Rockstar no ha anunciado versión de PC por ahora." },
    { q: "¿Cuánto ocupa?", a: "En PS5 se piden al menos 212 GB libres. En Xbox, consulta la ficha de la tienda en tu consola." },
    { q: "¿Qué edición compro?", a: "La Standard es el juego completo. La Ultimate (solo digital) añade vehículos, armas y ropa extra. Puedes pasar de Standard a Ultimate más adelante con una mejora." },
    { q: "¿La edición física trae disco?", a: "No: la versión física es un código de descarga dentro de la caja." }
  ]
};
