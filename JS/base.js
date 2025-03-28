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