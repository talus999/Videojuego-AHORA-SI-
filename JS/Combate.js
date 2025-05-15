export class Combate {
    /**
     * @param {Personaje} personaje
     * @param {Enemigo} enemigo
     */
    constructor(personaje, enemigo) {
      this.personaje = personaje;
      this.enemigo   = enemigo;
      this.turno = (personaje.velocidad > enemigo.velocidad) ? "Personaje" : "Enemigo";
    }
  
    atacarJugador() {
      this.enemigo.recibirDaño(this.personaje);
      if (this.enemigo.vida <= 0) {
        return "Has ganado";
      }
      this.turno = "Enemigo";
      return "SIGUE";
    }
  
    atacarEnemigo() {
      this.personaje.recibirDaño(this.enemigo);
      if (this.personaje.vida - this.personaje.vidaPerdida <= 0) {
        return "Has perdido";
      }
      this.turno = "Personaje";
      return "SIGUE";
    }

    huir() {
        const exito = Math.random() < 0.535;
        if (exito) {
          return true;
        } else {
          this.turno = "Enemigo";
          return false;
        }
    }
}