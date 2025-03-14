
function guardarPartida(personaje) {
    localStorage.setItem("nivel", personaje.nivel);
    localStorage.setItem("daño", personaje.daño);
    localStorage.setItem("vida", personaje.vida);
    localStorage.setItem("armadura", personaje.armadura);
    console.log("Partida guardada!");
}

class Objetos {
    constructor(peso, descripcion, precio){
        this.peso = peso;
        this.descripcion = descripcion;
        this.precio = precio;
    }

}

class armaProvisional extends Objetos {
    constructor (peso, descripcion, precio, daño){
        super(peso, descripcion, precio);
        this.daño = daño;
    }
}

class armaFisica extends Objetos {
    constructor (peso, descripcion, precio, daño){
        super(peso, descripcion, precio);
        this.daño = daño;
    }
}

class armaMagica extends Objetos {
    constructor (peso, descripcion, precio, daño){
        super(peso, descripcion, precio);
        this.daño = daño;
    }
}