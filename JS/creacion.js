import { guardarPartida } from "./codigo.js";
import { Personaje } from "./Personaje.js";

document.addEventListener("DOMContentLoaded", function(){

    console.log("Dom cargado")
    
    const botonCrear = document.getElementById("crearPersonaje");
    
    botonCrear.addEventListener("click", function() {
        let datos = document.getElementById("nombre").value.trim();
        let clase = document.getElementById("clase").value;
        console.log("Creando personaaje");
        debugger;
        if (datos === "") {
            alert("Por favor, ingresa un nombre para tu personaje.");
            return;
        }
    
        let personaje;
        if (clase === "guerrero") {
            personaje = new Personaje(datos);
        } else if (clase === "mago") {
            personaje = new Personaje(datos);
        } else if (clase === "asesino"){
            personaje = new Personaje(datos);
        }
        guardarPartida(personaje);
        alert("Personaje creado con éxito. ¡Bienvenido a la aldea!");
        window.location.href = "../HTML/aldea.html";
    });
})

