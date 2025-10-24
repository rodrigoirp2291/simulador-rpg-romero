# Simulador RPG: Batalla de Hechizos y Bestias

Proyecto: Entregable Final - Simulador RPG (Integración DOM, Eventos y localStorage)

Autor: Rodrigo Romero

## Descripción

Esta webapp simula combates entre un mago (tú) y varias bestias. Puedes elegir una bestia y un hechizo, atacar y ver el daño aplicado. El estado de vida de las bestias y el historial de ataques se guardan en `localStorage` para mantener el progreso entre recargas.

## Estructura del proyecto

- `index.html` – Página principal que carga el simulador.
- `css/styles.css` – Estilos del proyecto.
- `js/simulador.js` – Lógica del simulador (DOM, eventos, localStorage).
- `img/` – Imágenes utilizadas para el fondo y las bestias.

## Cómo probar (local)

1. Abre `index.html` en tu navegador (doble clic o arrastrar a la ventana del navegador).
2. Selecciona una bestia y un hechizo.
3. Haz clic en el botón “🗡️ Atacar” para aplicar daño.
4. Usa “Reiniciar juego” para borrar el progreso (limpia `localStorage`).




## Funcionalidades principales

- Interacción completa mediante DOM y eventos (no se usa `prompt/alert` para flujo principal).
- Persistencia con `localStorage` (estado de `bestias` e historial).
- Controles UI con selects y botones, imágenes de bestias y fondo temático.
- Sistema de tienda e inventario: puedes comprar items con oro y usarlos en batalla.
- Recompensas: derrotar bestias otorga oro al jugador y se refleja en la UI.
- Carga asíncrona de datos desde `data/game.json` (simulación de datos remotos).

<!-- Se removió la sección "Entregable" y notas relacionadas al ZIP por petición del autor. -->

