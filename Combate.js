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
        this.personaje.atacar(this.enemigo)
        if (this.enemigo.vida <= 0){
            console.log(`Has ganado`)
            return;
        }
        this.turno = "Enemigo";
    }

    turnoEnemigo(){
        this.enemigo.atacar(this.personaje)
        if (this.personaje.vida <= 0){
            console.log(`Has sido derrotado`)
            return;
        }
        this.turno = "Personaje";
    }

}