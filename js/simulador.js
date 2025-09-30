// Simulador RPG DOM - Entregable 2

// Datos iniciales
const hechizos = [
  { nombre: "Llama Ardiente", daño: 30, icono: "🔥" },
  { nombre: "Ventisca", daño: 20, icono: "❄️" },
  { nombre: "Trueno", daño: 25, icono: "⚡" },
];
const bestias = [
  { nombre: "Duende", vida: 50, icono: "👹", imagen: "goblin.jpg" },
  { nombre: "Trol", vida: 80, icono: "🧌", imagen: "troll2.jpg" },
  { nombre: "Wyvern", vida: 120, icono: "🐲", imagen: "dragon.jpg" },
];

// Cargar estado desde localStorage o usar datos iniciales
function cargarEstado() {
  const guardado = localStorage.getItem("estadoRPG");
  if (guardado) {
    return JSON.parse(guardado);
  }
  return { bestias: JSON.parse(JSON.stringify(bestias)), historial: [] };
}

function guardarEstado(estado) {
  localStorage.setItem("estadoRPG", JSON.stringify(estado));
}

function actualizarOpciones() {
  const selectBestia = document.getElementById("bestia");
  selectBestia.innerHTML = "";
  estado.bestias.forEach((b, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${b.icono} ${b.nombre} (Vida: ${b.vida})`;
    selectBestia.appendChild(option);
  });
}

function mostrarResultado(mensaje) {
  document.getElementById("resultado").textContent = mensaje;
}

function mostrarHistorial() {
  const div = document.getElementById("historial");
  div.innerHTML =
    "<strong>Historial de ataques:</strong><br>" +
    estado.historial.map((e) => `<div>${e}</div>`).join("");
}

// Evento principal
function atacar(e) {
  e.preventDefault();
  const selectBestia = document.getElementById("bestia");
  const idxBestia = parseInt(selectBestia.value);
  const idxHechizo = parseInt(document.getElementById("hechizo").value);
  const bestia = estado.bestias[idxBestia];
  const hechizo = hechizos[idxHechizo];
  if (bestia.vida <= 0) {
    mostrarResultado(`La criatura ${bestia.nombre} ya fue vencida.`);
    return;
  }
  const variacion = Math.round(Math.random() * 10 - 5); // entre -5 y +5
  const daño = hechizo.daño + variacion;
  bestia.vida -= daño;
  if (bestia.vida < 0) bestia.vida = 0;
  const mensaje = `¡Hechizo usado: ${hechizo.nombre} contra ${bestia.nombre}! Daño infligido: ${daño}. Vida restante: ${bestia.vida}`;
  mostrarResultado(mensaje);
  estado.historial.push(mensaje);
  guardarEstado(estado);
  // Mantener la selección de la bestia
  const valorSeleccionado = selectBestia.value;
  actualizarOpciones();
  selectBestia.value = valorSeleccionado;
  mostrarHistorial();
}

// Inicialización
const estado = cargarEstado();
document.addEventListener("DOMContentLoaded", () => {
  // Llenar selects
  const selectHechizo = document.getElementById("hechizo");
  hechizos.forEach((h, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = `${h.icono} ${h.nombre} (Daño base: ${h.daño})`;
    selectHechizo.appendChild(option);
  });
  actualizarOpciones();
  mostrarHistorial();

  // Mostrar imagen de la bestia seleccionada
  const selectBestia = document.getElementById("bestia");
  const imgBestia = document.getElementById("img-bestia");
  function mostrarImagenBestia() {
    const idx = parseInt(selectBestia.value);
    const b = estado.bestias[idx];
    if (b && b.imagen) {
      imgBestia.innerHTML = `
        <img src='img/${b.imagen}' alt='${b.nombre}' style='display:block;margin:auto;max-width:260px;max-height:200px;border-radius:14px;box-shadow:0 2px 8px #0002;'>
      `;
    } else {
      imgBestia.innerHTML = "";
    }
  }
  selectBestia.addEventListener("change", mostrarImagenBestia);
  setTimeout(mostrarImagenBestia, 100);

  document.getElementById("form-ataque").addEventListener("submit", atacar);
  document.getElementById("reset").addEventListener("click", () => {
    localStorage.removeItem("estadoRPG");
    location.reload();
  });
});
