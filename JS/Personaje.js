import { Inventario } from "./Inventario.js";
import { Arma, Consumible } from "./Objeto.js";

export class Personaje {
    constructor(datos) {
        if (typeof datos === "string") {
            this.nombre = datos;
            this.nivel = 1;
            this.armaduraBase = 2;
            this.velocidadBase = 4;
            this.experiencia = 0;
            this.experienciaNecesaria = 20;
            this.oro = 1000;
            this.inventario = new Inventario();
            this.armaEquipada = null;
        } else if (typeof datos === "object") {
            this.nombre = datos.nombre || "Protagonista Genérico";
            this.nivel = datos.nivel || 1;
            this.experiencia = datos.experiencia || 0;
            this.experienciaNecesaria = datos.experienciaNecesaria || 20;
            this.oro = datos.oro || 0;
            this.armaduraBase = typeof datos.armaduraBase === 'number' ? datos.armaduraBase : 2;
            this.velocidadBase = typeof datos.velocidadBase === 'number' ? datos.velocidadBase : 4;
            this.inventario = new Inventario();
            this.armaEquipada = datos.armaEquipada || null;

            // Rellena inventario con instancias ya reconstruidas
            if (Array.isArray(datos.inventario)) {
                datos.inventario.forEach((item, idx) => {
                    if (idx < this.inventario.capacidad) {
                        this.inventario.inventario[idx] = item;
                    }
                });
            }
        }

        // Estadísticas basadas en nivel
        this.calcularEstadisticas(this.nivel);
        this.actualizarDaño();
        this.vidaPerdida = 0;
    }

    equiparArma(arma) {
        if (this.inventario.inventario.includes(arma)) {
            this.armaEquipada = arma;
            this.actualizarDaño();
            console.log(`Te has equipado ${arma.nombre}.`);
        } else {
            console.log("¿Quieres equipar el aire? No es un objeto válido.");
        }
    }

    actualizarDaño() {
        this.daño = this.dañoBase + (this.armaEquipada ? this.armaEquipada.daño : 0);
    }

    recibirDaño(Enemigo) {
        const danioRecibido = Math.max(Enemigo.daño - this.armadura, 0);
        this.vidaPerdida += danioRecibido;
        alert(`${Enemigo.nombre} te ha hecho ${danioRecibido} puntos de daño. Vida restante: ${this.vida - this.vidaPerdida}.`);
    }

    atacar(Enemigo) {
        Enemigo.recibirDaño(this);
        if (Enemigo.vida <= 0) {
            this.ganarExperiencia(Enemigo.exp);
            this.oro += Enemigo.oro;
        }
    }

    ganarExperiencia(xp) {
        this.experiencia += xp;
        console.log(`Has conseguido ${xp} puntos de XP.`);
        while (this.experiencia >= this.experienciaNecesaria) {
            this.experiencia -= this.experienciaNecesaria;
            this.subirNivel();
        }
    }

    subirNivel() {
        this.nivel++;
        this.experienciaNecesaria = Math.floor(this.experienciaNecesaria * 2);
        this.calcularEstadisticas(this.nivel);
        console.log(`Has subido al nivel ${this.nivel}.`);
    }

    calcularEstadisticas(nivel) {
        this.vida = 5 + nivel;
        this.dañoBase = 4 + nivel;
        this.armadura = this.armaduraBase + Math.floor(nivel / 2);
        this.velocidad = this.velocidadBase + Math.floor(nivel / 3);
    }

    usarObjeto(nombreObjeto) {
        const objeto = this.inventario.buscarObjeto(nombreObjeto);
        if (objeto && objeto instanceof Consumible) {
            objeto.usar(this);
        } else {
            console.log("No puedes usar ese objeto.");
        }
    }
}