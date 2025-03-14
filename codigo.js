
function guardarPartida(personaje) {
    localStorage.setItem("nivel", personaje.nivel);
    localStorage.setItem("experiencia", personaje.experiencia);
    localStorage.setItem("experiencia necesaria", personaje.experienciaNecesaria);
    localStorage.setItem("oro", personaje.oro);
    localStorage.setItem("inventario",JSON.stringify(personaje.inventario.items));
    localStorage.setItem("arma equipada", personaje.armaEquipada);
    console.log("Partida guardada!");
}

document.getElementById("crearPersonaje").addEventListener("click", function() {
    let nombre = document.getElementById("nombre").value.trim();
    let clase = document.getElementById("clase").value;

    if (nombre === "") {
        alert("Por favor, ingresa un nombre para tu personaje.");
        return;
    }

    let personaje;
    if (clase === "guerrero") {
        personaje = new Personaje(nombre);
    } else if (clase === "mago") {
        personaje = new Mago(nombre);
    }

    guardarPartida(personaje);

    alert("Personaje creado con éxito. ¡Bienvenido a la aldea!");
    window.location.href = "aldea.html";
});

class Objetos {
    constructor(peso, descripcion, precio){
        this.peso = peso;
        this.descripcion = descripcion;
        this.precio = precio;
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