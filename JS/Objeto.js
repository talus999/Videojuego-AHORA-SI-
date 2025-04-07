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

    efectoAumentarVelocidad(personaje){
        personaje.armadura += this.valorEfecto;
    }

    efectoAumentarVelocidad(personaje){
        personaje.velocidad += this.valorEfecto;
    }
}