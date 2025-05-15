import { cargarPersonaje, guardarPartida } from "./codigo.js";
import { Consumible } from "./Objeto.js";
import { Enemigo }    from "./Enemigo.js";
import { Combate }    from "./Combate.js";

const poolEnemigos = [
  new Enemigo("Goblin", 1,  8, 2, 1,  8,  2, 3, "../recursos/img/imgEnemigos/goblin.png"),
  new Enemigo("Goblin", 2,  8, 2, 1,  8,  3, 3, "../recursos/img/imgEnemigos/goblin.png"),
  new Enemigo("Goblin", 3,  8, 2, 1,  8,  5, 3, "../recursos/img/imgEnemigos/goblin.png"),
  new Enemigo("Goblin Mas Fuerte", 4,  10, 3, 2,  13,  8, 3, "../recursos/img/imgEnemigos/goblin.png"),
  new Enemigo("Gato", 3, 15, 3, 2,  30,  12, 3, "../recursos/img/imgEnemigos/gato.jpg"),
  new Enemigo("Gato aun mas gato", 5, 15, 3, 2,  45,  18, 3, "../recursos/img/imgEnemigos/gato.jpg"),
  new Enemigo("EL GATO", 6, 18, 5, 4,  60,  25, 3, "../recursos/img/imgEnemigos/El_Gato.png"),
  new Enemigo("Aspiradora", 7, 20, 4, 3, 85,  50, 2, "../recursos/img/imgEnemigos/aspiradora.png"),
  new Enemigo("Señor Oscuro", 10,  30, 6, 3, 120, 150, 2, "../recursos/img/imgEnemigos/SEÑOR_OSCURO.jpg"),
  new Enemigo("La Abuelita Dorothy", 15,  45, 7, 5, 150, 180, 2, "../recursos/img/imgEnemigos/La_Abuelita_Dorothy.jpg"),
];

let indiceEnemigo = 0;
let combate;
let personaje;

document.addEventListener("DOMContentLoaded", () => {
  personaje = cargarPersonaje();

  const enVidaDisp  = document.getElementById("en-vida-display");
  const pjVidaDisp  = document.getElementById("pj-vida-display");
  const enImagen    = document.getElementById("en-imagen");
  const logDiv      = document.getElementById("combat-log");
  const btnAtacar   = document.getElementById("btn-atacar");
  const btnItem     = document.getElementById("btn-item");
  const btnHuir     = document.getElementById("btn-huir");

  siguienteEnemigo();

  function actualizarUI() {
    const e = combate.enemigo;
    enVidaDisp.textContent = `${Math.max(e.vida, 0)}/${ e.vidaBase + Math.floor(e.nivel * 1.5) }`;
    enImagen.src           = e.imagen;
    enImagen.alt           = `Imagen de ${e.nombre}`;
    pjVidaDisp.textContent = `${personaje.vida - personaje.vidaPerdida}/${personaje.vida}`;
  }

  function registrar(texto) {
    const p = document.createElement("p");
    p.textContent = texto;
    logDiv.appendChild(p);
    logDiv.scrollTop = logDiv.scrollHeight;
  }
  function turnoEnemigoYChequear() {
    const resultado = combate.atacarEnemigo();
    registrar(`${combate.enemigo.nombre} ataca.`);
    actualizarUI();

    if (resultado === "Has perdido") {
      registrar("Has sido derrotado. Regresas a la aldea...");
      personaje.vidaPerdida = 0;
      guardarPartida(personaje);
      setTimeout(() => location.href = "aldea.html", 550);
    }
  }
  btnAtacar.addEventListener("click", () => {
    const resultado = combate.atacarJugador();
    registrar(`Atacas a ${combate.enemigo.nombre}.`);
    actualizarUI();

    if (resultado === "Has ganado") {
      registrar(`Has derrotado a ${combate.enemigo.nombre}.`);
      registrar(`Ganas ${combate.enemigo.exp} XP y ${combate.enemigo.oro} oro.`);
      personaje.oro += combate.enemigo.oro;
      personaje.ganarExperiencia(combate.enemigo.exp);
      guardarPartida(personaje);
      return siguienteEnemigo();
    }

    turnoEnemigoYChequear();
  });

  btnItem.addEventListener("click", () => {
    const consumibles = personaje.inventario.inventario.filter(it => it instanceof Consumible);
    if (!consumibles.length) {
      registrar("No tienes consumibles para usar.");
      return;
    }
    const lista = consumibles
      .map((c, i) => `${i+1}. ${c.nombre} — ${c.descripcion}`)
      .join("\n");
    const opcion = prompt(`¿Qué ítem quieres usar?\n${lista}\n0 para cancelar`);
    const idx    = parseInt(opcion, 10) - 1;
    if (opcion === "0" || isNaN(idx) || idx < 0 || idx >= consumibles.length) {
      registrar("Uso de ítem cancelado.");
      return;
    }
    const elegido = consumibles[idx];
    personaje.usarObjeto(elegido.nombre);
    registrar(`Usas ${elegido.nombre}.`);
    guardarPartida(personaje);
    actualizarUI();

    turnoEnemigoYChequear();
  });

  btnHuir.addEventListener("click", () => {
    registrar("Intentas huir...");
    const exito = combate.huir();
    actualizarUI();
    if (exito) {
      registrar("Has escapado del combate.");
      setTimeout(() => location.href = "aldea.html", 550);
    } else {
      registrar("Fallaste al huir.");
      turnoEnemigoYChequear();
    }
  });

  function siguienteEnemigo() {
    if (indiceEnemigo >= poolEnemigos.length) {
      registrar("¡Has derrotado a todos los enemigos!");
      guardarPartida(personaje);
      return setTimeout(() => location.href = "aldea.html", 550);
    }
    const e = poolEnemigos[indiceEnemigo++];
    combate = new Combate(personaje, e);
    registrar(`Se acerca un ${e.nombre} (nivel ${e.nivel}).`);
    actualizarUI();
  }
});