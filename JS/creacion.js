import { guardarPartida } from "../JS/codigo.js";

document.addEventListener("DOMContentLoaded", function(){

    console.log("Dom cargado")
    
    const botonCrear = document.getElementById("crearPersonaje");
    
    botonCrear.addEventListener("click", function() {
        let nombre = document.getElementById("nombre").value.trim();
        let clase = document.getElementById("clase").value;
        console.log("Creando personaaje");
        debugger;
        if (nombre === "") {
            alert("Por favor, ingresa un nombre para tu personaje.");
            return;
        }
    
        let personaje;
        if (clase === "guerrero") {
            personaje = new Guerrero(nombre);
        } else if (clase === "mago") {
            personaje = new Mago(nombre);
        } else if (clase === "asesino"){
            personaje = new Asesino(nombre);
        }
        guardarPartida(personaje);
        alert("Personaje creado con éxito. ¡Bienvenido a la aldea!");
        window.location.href = "../HTML/aldea.html";
    });
})

