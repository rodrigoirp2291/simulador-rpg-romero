# Simulador RPG: Batalla de Hechizos y Bestias

Proyecto: Entregable 2 - Simulador RPG (Integración DOM, Eventos y localStorage)

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

Nota: Asegúrate de que la carpeta `img` contenga las imágenes referenciadas (`goblin.jpg`, `troll2.jpg`, `dragon.jpg`, `wallhaven-21y179.jpg`), ya que el proyecto las carga desde `img/`.

## Funcionalidades principales

- Interacción completa mediante DOM y eventos (no se usa `prompt/alert` para flujo principal).
- Persistencia con `localStorage` (estado de `bestias` e historial).
- Controles UI con selects y botones, imágenes de bestias y fondo temático.
 - Sistema de tienda e inventario: puedes comprar items con oro y usarlos en batalla.
 - Recompensas: derrotar bestias otorga oro al jugador y se refleja en la UI.
 - Carga asíncrona de datos desde `data/game.json` (simulación de datos remotos).

## Entregable

Nombre del ZIP sugerido: `Entregable2-Romero.zip` (contiene la carpeta del proyecto lista para entregar).

---

Si quieres que realice alguna mejora adicional (más bestias, efectos visuales, exportar historial a JSON, o desplegar en GitHub Pages), dime y lo agrego.
 
 ### Notas para entrega final
 - Asegúrate de incluir la carpeta `img/` con las imágenes referenciadas (bestias y items) antes de comprimir.
 - El ZIP final recomendado se debe llamar `ProyectoFinal-Romero.zip` o `Entregable2-Romero.zip` según lo solicite el docente.
 - Si quieres, puedo generar el ZIP por ti y subirlo al repositorio (si me das permiso para ejecutar los comandos git/zip aquí).
