import { Inventario } from "./Inventario.js";
import { Personaje } from "./Personaje.js";
import { Arma, Consumible } from "./Objeto.js";

 export class Vendedor {
    constructor(){
        this.objetos = this.generarPoolObjetos();
        this.inventario = this.generarInventario();
    }

    generarPoolObjetos() {
        return [
            new Arma (2, "Espada Corta", "Una simple espada corta y algo gastada", 15, 2),
            new Arma (0.8, "Daga vieja", "Un cuchillo que sirve mas para huntar mantequilla que para matar", 8, 4),
            new Arma (1, "Bara de madera", "Deberia llamarse palo", 10, 2),
            new Arma (5, "Espada Legendaria Mata Titanes", "¿Necesita mas descripcion?", 1000, 15),
            new Arma (3, "Deux", "Una poderosa vara magica capaz de convocar rayos", 1000, 15),
            new Arma (2, "Espada de plata", "Una espada de plata, que esperabas", 150, 6),
            new Consumible (0.5, "Pocion de salud", "Te curará un poco, no te motives", 5, "curarVida", 5),
            new Consumible (0.5, "Pocion de salud", "Te curará un poco, no te motives", 5, "curarVida", 5),
            new Consumible (0.5, "Pocion de salud", "Te curará un poco, no te motives", 5, "curarVida", 5),
            new Consumible (0.5, "Super pocion de salud", "Esto esta mucho mejor", 50, "curarVida", 20),
            new Consumible (0.5, "LA POCION DE SALUD", "Te curará tanto que te dara cancer", 150, "curarVida", 50),
            new Consumible (0.5, "Pocion de fortaleza", "Con esto las espadas rebotan", 250, "aumentarDefensa", 2),
            new Consumible (0.5, "Pocion de fortaleza", "Con esto las espadas rebotan", 250, "aumentarDefensa", 2),
            new Consumible (0.5, "Pocion de Velocidad", "No seras flash, pero sirve", 250, "aumentarVelocidad", 1),
        ];
    }

    generarInventario(){
        const inventario = [];
        const todosLosObjetos = this.objetos;

        while (inventario.length < 5 && todosLosObjetos.length > 0){
            let indiceRandom = Math.floor(Math.random()*todosLosObjetos.length);
            let objetoParaVender = todosLosObjetos.splice(indiceRandom,1)[0];
            inventario.push(objetoParaVender);
        }

        return inventario;
    }

    venderAJugador(personaje, nombreObjeto){
        let objeto = this.inventario.find(obj => obj.nombre.toLowerCase() === nombreObjeto.toLowerCase());
    
        if (!objeto) {
            console.log("No tengo de eso, elige otra cosa.");
            return false;
        }
    
        if (personaje.oro < objeto.precio) {
            console.log("No tienes suficiente oro. Vuelve cuando tengas dinero y dejes de hacerme perder el tiempo.");
            return false;
        }
    
        if (personaje.inventario.inventario.indexOf(null) === -1) {
            console.log("No tienes espacio en tu inventario, vuelve cuando lo limpies y dejes de hacerme perder el tiempo.");
            return false;
        }
    
        personaje.oro -= objeto.precio;
        personaje.inventario.añadirAInventario(objeto);
        console.log(`Gracias por tu compra, ${personaje.nombre}.`);
        return true;
    }

    comprarDelJugador(personaje, nombreObjeto){
        let objeto = personaje.inventario.buscarObjeto(nombreObjeto);

        if (!objeto) {
            console.log("No tienes ese objeto en tu inventario, idiota.");
            return false;
        }
        
        let precioCompra = Math.floor(objeto.precio / 2);

        personaje.oro += precioCompra;

        personaje.inventario.tirarObjeto(nombreObjeto);

        console.log(`Un placer hacer negocios contigo, ${personaje.nombre}`)
        return true;
    }
}