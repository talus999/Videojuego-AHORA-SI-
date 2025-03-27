import { guardarPartida, cargarPersonaje } from "./codigo.js";

addEventListener("DOMContentLoaded", function(){
    cargarPersonaje()
});

document.getElementById("salir").addEventListener("click", () => {
    guardarPartida(personaje);
    window.location.href = "aldea.html";
});

document.getElementById("comprar").addEventListener("click", () => {
    
});

document.getElementById("vender").addEventListener("click", () => {

});