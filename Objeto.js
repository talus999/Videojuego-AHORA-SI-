class Objetos {
    constructor(peso, descripcion, precio){
        this.peso = peso;
        this.descripcion = descripcion;
        this.precio = precio;
    }

}

class Arma extends Objetos {
    constructor (peso, descripcion, precio, daño){
        super(peso, descripcion, precio);
        this.daño = daño;
    }
}

class Consumible extends Objetos {
    constructor (peso, descripcion, precio, daño){
        super(peso, descripcion, precio);
        this.tipoEfecto = tipoEfecto;
        this.valorEfecto = valorEfecto;
    }

    usar(personaje) {
        if (this.tipoEfecto === "curarVida") {
            this.efectoCurarVida(personaje);
        } else if (this.tipoEfecto === "restaurarMana") {
            this.efectoRestaurarMana(personaje);
        }
    }

    efectoCurarVida(personaje) {
        let vidaRestaurada = this.valorEfecto;
        personaje.vidaPerdida -= vidaRestaurada;
    }

    efectoRestaurarMana(personaje) {
        if (personaje instanceof Mago) {
            personaje.manaActual += this.valorEfecto;
            if (personaje.manaActual > personaje.manaMaximo) {
                personaje.manaActual = personaje.manaMaximo;
            }
        } else {
            console.log("No ha pasado nada.");
        }
    }
}