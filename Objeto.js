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
        this.efecto = efecto;
    }

    usar(){

    }
}