
function guardarPartida(personaje) {
    localStorage.setItem("nivel", personaje.nivel);
    localStorage.setItem("experiencia", personaje.experiencia);
    localStorage.setItem("experiencia necesaria", personaje.experienciaNecesaria);
    localStorage.setItem("oro", personaje.oro);
    localStorage.setItem("inventario",JSON.stringify(personaje.inventario.items));
    localStorage.setItem("arma equipada", personaje.armaEquipada);
    console.log("¡Partida guardada!");
}

document.getElementById("crearPersonaje").addEventListener("click", function() {
    let nombre = document.getElementById("nombre").value.trim();
    let clase = document.getElementById("clase").value;

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
    window.location.href = "aldea.html";
});

document.getElementById("btnVolver").addEventListener("click", () => {
    guardarPartida(personaje);
    window.location.href = "base.html";
});

document.addEventListener("DOMContentLoaded", function() {
    const botonContinuar = document.getElementById("Continuar");
    const botonBorrarPartida = document.getElementById("Borrar Partida");

    botonContinuar.addEventListener("click", function() {
            window.location.href = "aldea.html";
    });
    botonBorrarPartida.addEventListener("click", function() {
        localStorage.clear();
        alert("La partida ha sido borrada")
        botonContinuar.disabled = true;
        botonBorrarPartida.disabled = true;
    });

    if (localStorage.getItem("nivel") === null) {
        botonContinuar.disabled = true;
        botonBorrarPartida.disabled = true;
    } else {
        botonContinuar.disabled = false;
        botonBorrarPartida.disabled = false;
    }
});

document.addEventListener("DOMContentLoaded", function(){
    const botonNuevaPartida = document.getElementsById("Nueva Partida");

} )