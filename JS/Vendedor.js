import { Arma, Consumible } from "./Objeto.js";

export class Vendedor {
    constructor() {
        this.capacidad = 5;
        this.objetos = this.generarPoolObjetos();
        this.inventario = this.generarInventario();
    }

    generarPoolObjetos() {
        return [
            new Arma(2, "Espada Corta", "Una simple espada corta y algo gastada", 15, 2),
            new Arma(2, "Espada Normalucha", "Una simple espada corta", 30, 8),
            new Arma(0.8, "Daga vieja", "Un cuchillo que sirve más para huntar mantequilla que para matar", 8, 4),
            new Arma(0.8, "Daga Afilada", "Un cuchillo afilado y mortal", 25, 9),
            new Arma(1, "Bara de madera", "Debería llamarse palo", 10, 2),
            new Arma(5, "Espada Legendaria Mata Titanes", "¿Necesita más descripción?", 1000, 18),
            new Arma(3, "Deux", "Una poderosa vara mágica capaz de convocar rayos", 750, 17),
            new Arma(2, "Espada de plata", "Una espada de plata, ¿qué esperabas?", 100, 10),
            new Arma(0.8, "Daga de platano", "Un cuchillo afilado y potasicamente mortal", 120, 12),
            new Consumible(0.5, "Poción de salud", "Te curará un poco, no te motives", 5, "curarVida", 5),
            new Consumible(0.5, "Poción de salud", "Te curará un poco, no te motives", 5, "curarVida", 5),
            new Consumible(0.5, "Poción de salud", "Te curará un poco, no te motives", 5, "curarVida", 5),
            new Consumible(0.5, "Super poción de salud", "Esto está mucho mejor", 50, "curarVida", 20),
            new Consumible(0.5, "LA POCION DE SALUD", "Te curará tanto que te dará cáncer", 150, "curarVida", 50),
            new Consumible(0.5, "Poción de fortaleza", "Con esto las espadas rebotan", 250, "aumentarDefensa", 2),
            new Consumible(0.5, "Poción de fortaleza", "Con esto las espadas rebotan", 250, "aumentarDefensa", 2),
            new Consumible(0.5, "Poción de Velocidad", "No serás Flash, pero sirve", 250, "aumentarVelocidad", 1),
        ];
    }

    generarInventario() {
        const inv = [];
        const pool = [...this.objetos];
        while (inv.length < this.capacidad && pool.length > 0) {
            const idx = Math.floor(Math.random() * pool.length);
            inv.push(pool.splice(idx, 1)[0]);
        }
        return inv;
    }

    venderAJugador(personaje, nombreObjeto) {
        const objeto = this.inventario.find(o => o.nombre.toLowerCase() === nombreObjeto.toLowerCase());
        if (!objeto) return false;
        if (personaje.oro < objeto.precio) return false;

        if (personaje.inventario.inventario.findIndex(it => it === null) === -1) return false;

        personaje.oro -= objeto.precio;
        personaje.inventario.añadirAInventario(objeto);
        this.inventario = this.inventario.filter(o => o !== objeto);
        return true;
    }

    comprarDelJugador(personaje, nombreObjeto) {
        const idx = personaje.inventario.inventario
            .findIndex(it => it && it.nombre.toLowerCase() === nombreObjeto.toLowerCase());
        if (idx === -1) return false;
        const objeto = personaje.inventario.inventario[idx];
        const precioCompra = Math.floor(objeto.precio / 2);

        personaje.oro += precioCompra;

        personaje.inventario.inventario[idx] = null;
        return true;
    }
}