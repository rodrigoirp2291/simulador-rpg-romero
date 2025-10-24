// Simulador RPG DOM - Entregable 2

// Datos por defecto (se usarán como fallback si falla la carga remota)
const defaultHechizos = [
  { nombre: "Llama Ardiente", daño: 30, icono: "🔥", precio: 50 },
  { nombre: "Ventisca", daño: 20, icono: "❄️", precio: 40 },
  { nombre: "Trueno", daño: 25, icono: "⚡", precio: 45 },
];
const defaultBestias = [
  {
    nombre: "Duende",
    vida: 50,
    icono: "👹",
    imagen: "goblin.jpg",
    recompensa: 10,
  },
  {
    nombre: "Trol",
    vida: 80,
    icono: "🧌",
    imagen: "troll2.jpg",
    recompensa: 20,
  },
  {
    nombre: "Wyvern",
    vida: 120,
    icono: "🐲",
    imagen: "dragon.jpg",
    recompensa: 50,
  },
];

// Variables que serán pobladas desde data/game.json
let hechizos = [];
let bestias = [];
let tienda = [];
let estado; // se inicializa después de cargar datos

// Cargar estado desde localStorage o usar datos iniciales
function cargarEstado() {
  const guardado = localStorage.getItem("estadoRPG");
  if (guardado) {
    return JSON.parse(guardado);
  }
  // clonar bestias para estado inicial
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
  // Si la bestia fue derrotada, otorgar recompensa al jugador
  if (bestia.vida === 0) {
    const recompensa = bestia.recompensa || 0;
    if (!estado.player) estado.player = { oro: 0, inventario: [] };
    estado.player.oro = (estado.player.oro || 0) + recompensa;
    estado.historial.push(
      `Has derrotado a ${bestia.nombre} y recibiste ${recompensa} oro.`
    );
    mostrarResultado(
      `¡Has derrotado a ${bestia.nombre}! Recompensa: ${recompensa} oro.`
    );
  }
  guardarEstado(estado);
  // Mantener la selección de la bestia
  const valorSeleccionado = selectBestia.value;
  actualizarOpciones();
  selectBestia.value = valorSeleccionado;
  mostrarHistorial();
  // actualizar UI relacionado con oro e inventario
  if (typeof renderPlayer === "function") renderPlayer();
}

document.addEventListener("DOMContentLoaded", () => {
  // Inicialización asíncrona: carga datos desde data/game.json y luego inicializa la UI
  async function init() {
    // cargar datos remotos (data/game.json)
    try {
      const res = await fetch("data/game.json");
      if (!res.ok) throw new Error("No se pudo cargar data/game.json");
      const data = await res.json();
      hechizos = data.hechizos || defaultHechizos;
      bestias = data.bestias || defaultBestias;
      tienda = data.tienda || [];
    } catch (err) {
      // fallback a datos por defecto
      console.warn("Fallo carga remota, usando datos por defecto:", err);
      hechizos = defaultHechizos;
      bestias = defaultBestias;
      tienda = [];
    }

    // ahora inicializar estado y UI
    estado = cargarEstado();

    // Llenar select de hechizos
    const selectHechizo = document.getElementById("hechizo");
    selectHechizo.innerHTML = "";
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
        imgBestia.innerHTML = `\n          <img src='img/${b.imagen}' alt='${b.nombre}' style='display:block;margin:auto;max-width:260px;max-height:200px;border-radius:14px;box-shadow:0 2px 8px #0002;'>\n        `;
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

    // Render UI adicional: tienda, inventario y oro del jugador
    function renderPlayer() {
      const oroEl = document.getElementById("oro");
      oroEl.textContent = estado.player?.oro ?? 0;
    }
    // Exponer renderPlayer globalmente para que funciones definidas fuera
    // de este scope (por ejemplo `atacar`) puedan invocarla y forzar
    // la actualización inmediata del UI del jugador.
    window.renderPlayer = renderPlayer;

    function renderTienda() {
      const tiendaDiv = document.getElementById("tienda");
      tiendaDiv.innerHTML = "";
      tienda.forEach((item) => {
        const card = document.createElement("div");
        card.className = "shop-item";
        card.style =
          "background:rgba(255,255,255,0.9);padding:10px;border-radius:8px;min-width:140px;text-align:center;";
        card.innerHTML = `
          <img src="img/${item.imagen}" alt="${item.nombre}" style="max-width:100px;max-height:80px;display:block;margin:0 auto 8px;">
          <div style="font-weight:600">${item.nombre}</div>
          <div style="font-size:0.9rem;color:#333">Precio: ${item.precio} 💰</div>
          <button style="margin-top:8px;" onclick="comprarItem(${item.id})">Comprar</button>
        `;
        tiendaDiv.appendChild(card);
      });
    }

    function renderInventario() {
      const inv = document.getElementById("inventario");
      inv.innerHTML = "";
      const invArr = estado.player?.inventario || [];
      if (invArr.length === 0) {
        inv.innerHTML = '<div style="color:#666">(Inventario vacío)</div>';
        return;
      }
      invArr.forEach((it, idx) => {
        const el = document.createElement("div");
        el.className = "inventory-item";
        el.style =
          "background:rgba(255,255,255,0.9);padding:8px;border-radius:8px;min-width:120px;text-align:center;";
        el.innerHTML = `
          <img src="img/${it.imagen}" alt="${it.nombre}" style="max-width:80px;max-height:60px;display:block;margin:0 auto 6px;">
          <div style="font-weight:600">${it.nombre}</div>
          <button style="margin-top:6px;" onclick="usarItem(${idx})">Usar</button>
        `;
        inv.appendChild(el);
      });
    }

    // Exponer funciones globales para botones inline
    window.comprarItem = function (id) {
      const item = tienda.find((x) => x.id === id);
      if (!item) return;
      if (!estado.player) estado.player = { oro: 100, inventario: [] };
      if (estado.player.oro < item.precio) {
        mostrarResultado("No tienes suficiente oro.");
        return;
      }
      estado.player.oro -= item.precio;
      estado.player.inventario.push(item);
      guardarEstado(estado);
      renderPlayer();
      renderInventario();
      mostrarResultado(`Compraste ${item.nombre} por ${item.precio} oro.`);
    };

    window.usarItem = function (index) {
      if (!estado.player || !estado.player.inventario[index]) return;
      const item = estado.player.inventario.splice(index, 1)[0];
      // efecto simple: si cura, sumar vida a la bestia seleccionada
      const selectBestia = document.getElementById("bestia");
      const idx = parseInt(selectBestia.value);
      const b = estado.bestias[idx];
      if (item.efecto === "curar" && b) {
        b.vida += item.valor;
        mostrarResultado(
          `Usaste ${item.nombre}. ${b.nombre} recupera ${item.valor} vida.`
        );
      } else {
        mostrarResultado(`Usaste ${item.nombre}.`);
      }
      guardarEstado(estado);
      renderInventario();
      actualizarOpciones();
    };

    // inicial render
    if (!estado.player) estado.player = { oro: 100, inventario: [] };
    renderPlayer();
    renderTienda();
    renderInventario();
  }

  init();
});
