import { cargarPersonaje, guardarPartida } from "./codigo.js";
import { Personaje } from "./Personaje.js";
import { Enemigo } from "./Enemigo.js";
import { Combate } from "./Combate.js";

const poolEnemigos = [
    new Enemigo("Goblin", 1,  8, 2, 1, 5, 2, 3, "../recursos/img/imgEnemigos/goblin.png"),
    new Enemigo("Gato",   2, 12, 3, 2, 8, 5, 3, "../recursos/img/imgEnemigos/gato.jpg"),
    new Enemigo("Aspiradora",3,18,4,3,12,8,2, "../recursos/img/imgEnemigos/aspiradora.png"),
    new Enemigo("Señor Oscuro",5,1,5,4,20,10,5, "../recursos/img/imgEnemigos/SEÑOR_OSCURO.jpg"),
];

let indiceEnemigo = 0;
let combate;
let personaje;

document.addEventListener("DOMContentLoaded", () => {
    personaje = cargarPersonaje();

    const pjNombre  = document.getElementById("pj-nombre");
    const pjVida    = document.getElementById("pj-vida");
    const pjVidaMax = document.getElementById("pj-vida-max");
    const pjOro     = document.getElementById("pj-oro");

    const enNombre  = document.getElementById("en-nombre");
    const enImagen  = document.getElementById("en-imagen");
    const enVida    = document.getElementById("en-vida");
    const enVidaMax = document.getElementById("en-vida-max");

    const logDiv    = document.getElementById("combat-log");
    const btnAtacar  = document.getElementById("btn-atacar");
    const btnItem    = document.getElementById("btn-item");
    const btnHuir    = document.getElementById("btn-huir");

    siguienteEnemigo();

    function actualizarUI() {
        pjNombre.textContent    = personaje.nombre;
        pjVida.textContent      = personaje.vida - personaje.vidaPerdida;
        pjVidaMax.textContent   = personaje.vida;
        pjOro.textContent       = personaje.oro;

        const e = combate.enemigo;
        enNombre.textContent    = e.nombre;
        enImagen.src            = e.imagenRuta;
        enImagen.alt            = `Imagen de ${e.nombre}`;
        enVida.textContent      = Math.max(e.vida, 0);
        enVidaMax.textContent   = e.vidaBase + Math.floor(e.nivel * 1.5);
    }

    function registrar(texto) {
            const p = document.createElement("p");
            p.textContent = texto;
            logDiv.appendChild(p);
            logDiv.scrollTop = logDiv.scrollHeight;
    }

    function turnoEnemigo() {
        if (combate.turno === "Enemigo" && combate.enemigo.vida > 0) {
        combate.turnoEnemigo();
        registrar(`${combate.enemigo.nombre} ataca.`);
        actualizarUI();
            if (personaje.vidaPerdida >= personaje.vida) {
                registrar("Has sido derrotado. Regresas a la aldea...");
                personaje.vidaPerdida = 0;
                guardarPartida(personaje);
                setTimeout(() => location.href = "aldea.html", 1500);
            }
        }
    }

    btnAtacar.addEventListener("click", () => {
        combate.personaje.atacar(combate.enemigo);
        registrar(`Atacas a ${combate.enemigo.nombre}.`);
        actualizarUI();
        turnoEnemigo();
    });
    btnItem.addEventListener("click", () => {
        const consumibles = personaje.inventario.inventario.filter(it => it instanceof Consumible);
        if (consumibles.length === 0) {
        registrar("No tienes consumibles para usar.");
        return;
        }

        const lista = consumibles
        .map((c, i) => `${i+1}. ${c.nombre} (${c.descripcion})`)
        .join("\n");
        const opcion = prompt(
        `¿Qué ítem quieres usar?\n${lista}\n0 para cancelar`
        );
        const idx = parseInt(opcion) - 1;
    
        if (opcion === "0" || isNaN(idx) || idx < 0 || idx >= consumibles.length) {
        registrar("No has podido usarlo");
        return;
        }

        const elegido = consumibles[idx];
        personaje.usarObjeto(elegido.nombre);
        registrar(`Usas ${elegido.nombre}.`);
        guardarPartida(personaje);
        actualizarUI();
        turnoEnemigo();
    })
    btnHuir.addEventListener("click", () => {
        combate.huir();
        registrar("Intentas huir...");
        actualizarUI();
        if (combate.turno === "Enemigo") turnoEnemigo();
    });

    function siguienteEnemigo() {
        if (indiceEnemigo >= poolEnemigos.length) {
        registrar("¡Has derrotado a todos los enemigos!");
        guardarPartida(personaje);
        return setTimeout(() => location.href = "aldea.html", 1500);
        }
        const e = poolEnemigos[indiceEnemigo++];
        combate = new Combate(personaje, e);
        registrar(`Se acerca un ${e.nombre} (nivel ${e.nivel})`);
        actualizarUI();
    }
});