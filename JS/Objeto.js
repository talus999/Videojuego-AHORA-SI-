class Objetos {
    constructor(peso, nombre, descripcion, precio){
        this.peso = peso;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }

}

export class Arma extends Objetos {
    constructor (peso, nombre, descripcion, precio, daño){
        super(peso, nombre, descripcion, precio);
        this.daño = daño;
    }
}

export class Consumible extends Objetos {
    constructor (peso, nombre, descripcion, precio, tipoEfecto, valorEfecto){
        super(peso, nombre, descripcion, precio);
        this.tipoEfecto = tipoEfecto;
        this.valorEfecto = valorEfecto;
    }

    usar(personaje) {
        console.log ("A beber")
        switch (this.tipoEfecto) {
            case "curarVida":
                this.efectoCurarVida(personaje);
                break;
            case "restaurarMana":
                this.efectoRestaurarMana(personaje);
                break;
            case "aumentarDefensa":
                this.efectoAumentarDefensa(personaje);
                break;
            case "aumentarVelocidad":
                this.efectoAumentarVelocidad(personaje);
                break;
            default:
                console.log("Este consumible no tiene un efecto válido.");
        }

        personaje.inventario.tirarObjeto(this.nombre);
    }

    efectoCurarVida(personaje) {
        personaje.vidaPerdida = Math.max( 0, personaje.vidaPerdida - this.valorEfecto);
        console.log(`Has recuperado ${this.valorEfecto} puntos de vida.`);
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

    efectoAumentarVelocidad(personaje){
        personaje.armadura += this.valorEfecto;
    }

    efectoAumentarDefensa(personaje) {
        personaje.armadura += this.valorEfecto;
        console.log(`Tu armadura aumenta en ${this.valorEfecto}.`);
    }
}