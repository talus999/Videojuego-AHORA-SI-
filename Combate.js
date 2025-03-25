class Combate{
    constructor(personaje, enemigo){
        this.personaje = personaje;
        this.enemigo = enemigo;
        if (this.personaje.velocidad > this.enemigo.velocidad){
            this.turno = "Personaje"
        } else {
            this.turno = "Enemigo"
        }
    }

    inicioCombate(){
        console.log(`Comienza el combate`)
        while (this.personaje.vida > 0 && this.enemigo.vida > 0){
            if (this.turno === "Personaje"){
                this.turnoJugador();
            } else {
                this.turnoEnemigo();
            }
            
        }
        
    }

    turnoJugador(){
        let opcion = prompt("¿Qué quieres hacer? \n1. Atacar\n2. Huir");

        if (opcion === "1"){
            this.personaje.atacar(this.enemigo)
            if (this.enemigo.vida <= 0){
                console.log(`Has ganado`)
                return;
            }
            this.turno = "Enemigo";
        } else if (opcion === "2") {
            this.huir();
        } else {
            console.log("Eso no existe, imbecil. Pierdes tu turno.");
            this.turno = "Enemigo";
        }
        
        
    }

    turnoEnemigo(){
        this.enemigo.atacar(this.personaje)
        if (this.personaje.vida <= 0){
            console.log(`Has sido derrotado`)
            return;
        }
        this.turno = "Personaje";
    }

    huir() {
        let probabilidadEscape = this.personaje.velocidad / (this.personaje.velocidad + this.enemigo.velocidad);
        if (Math.random() < probabilidadEscape) {
            console.log("Has logrado escapar del combate.");
            return
        } else {
            console.log("No has podido escapar.");
            this.turno = "Enemigo";
        }
    }

}