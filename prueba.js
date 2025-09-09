// Juego de Aventuras: Batalla de Hechizos y Bestias

// Hechizos disponibles y bestias a enfrentar
const hechizos = [
  { nombre: "Llama Ardiente", daño: 30 },
  { nombre: "Ventisca", daño: 20 },
  { nombre: "Trueno", daño: 25 },
];
const bestias = [
  { nombre: "Duende", vida: 50 },
  { nombre: "Trol", vida: 80 },
  { nombre: "Wyvern", vida: 120 },
];

// Permite al jugador elegir una opción de un listado
function seleccionarOpcion(mensaje, lista) {
  let texto = mensaje + "\n";
  lista.forEach((item, idx) => {
    texto += `${idx + 1}. ${item.nombre}\n`;
  });
  let seleccion;
  do {
    seleccion = parseInt(prompt(texto + "Ingresa el número de tu elección:"));
  } while (isNaN(seleccion) || seleccion < 1 || seleccion > lista.length);
  return lista[seleccion - 1];
}

// Calcula el daño y actualiza la vida de la bestia
function lanzarHechizo(bestia, hechizo) {
  const dañoFinal = Math.floor(hechizo.daño + Math.random() * 10 - 5); // Daño variable
  bestia.vida -= dañoFinal;
  if (bestia.vida < 0) bestia.vida = 0;
  return dañoFinal;
}

// Muestra el resultado del ataque al usuario
function mostrarResultado(bestia, hechizo, daño) {
  const mensaje = `¡Hechizo usado: ${hechizo.nombre} contra ${bestia.nombre}!\nDaño infligido: ${daño}\nVida restante de la bestia: ${bestia.vida}`;
  alert(mensaje);
  console.log(mensaje);
}

// Juego principal: Batalla de hechizos
function iniciarAventura() {
  alert(
    "¡Comienza tu aventura mágica! Enfrenta bestias usando tus hechizos favoritos."
  );
  let seguirJugando = true;
  while (seguirJugando) {
    const bestia = seleccionarOpcion("¿A qué bestia quieres atacar?", bestias);
    if (bestia.vida <= 0) {
      alert(
        `La criatura ${bestia.nombre} ya fue vencida. ¡Elige otra para continuar!`
      );
      continue;
    }
    const hechizo = seleccionarOpcion(
      "Selecciona el hechizo que deseas usar:",
      hechizos
    );
    const daño = lanzarHechizo(bestia, hechizo);
    mostrarResultado(bestia, hechizo, daño);
    if (bestia.vida === 0) {
      alert(`¡Victoria! Has derrotado a ${bestia.nombre}!`);
    }
    seguirJugando = confirm("¿Quieres lanzar otro hechizo?");
  }
  alert("¡Fin de la aventura! Gracias por jugar.");
}

// Inicia el juego automáticamente
iniciarAventura();
