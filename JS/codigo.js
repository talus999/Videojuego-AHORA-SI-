
export function guardarPartida(personaje) {   
    debugger;
    localStorage.setItem("nivel", personaje.nivel);
    localStorage.setItem("experiencia", personaje.experiencia);
    localStorage.setItem("experienciaNecesaria", personaje.experienciaNecesaria);
    localStorage.setItem("armaduraBase", personaje.armaduraBase);
    localStorage.setItem("velocidadBase", personaje.velocidadBase);
    localStorage.setItem("oro", personaje.oro);
    localStorage.setItem("inventario",JSON.stringify(personaje.inventario.items));
    localStorage.setItem("armaEquipada", personaje.armaEquipada);
    console.log("¡Partida guardada!");
}

export function cargarPersonaje(){
    return {
        nivel: parseInt(localStorage.getItem("nivel")),
        experiencia: parseInt(localStorage.getItem("experiencia")),
        experienciaNecesaria: parseInt(localStorage.getItem("experienciaNecesaria")),
        armaduraBase: parseInt(localStorage.getItem("armaduraBase")),
        velocidadBase: parseInt(localStorage.getItem("velocidadBase")),
        oro: parseInt(localStorage.getItem("oro")),
        inventario: parseInt(localStorage.getItem("inventario")),
        armaEquipada: parseInt(localStorage.getItem("armaEquipada"))
    }
}

document.getElementById("Nueva Partida").addEventListener("click", function() {
    window.location.href = "creacion.html";
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