export class Enemigo {
    constructor(nombre, nivel, vidaBase, dañoBase, armaduraBase, expBase, oroBase, velocidadBase, imagen) {
        this.nombre = nombre;
        this.nivel = nivel;
        this.vidaBase = vidaBase;
        this.dañoBase = dañoBase;
        this.armaduraBase = armaduraBase;
        this.expBase = expBase;
        this.oroBase = oroBase;
        this.velocidadBase = velocidadBase;
        this.imagen = imagen;

        this.calcularEstadisticas();
    }

    calcularEstadisticas() {
        this.vida = this.vidaBase + Math.floor(this.nivel * 1.5);
        this.daño = this.dañoBase + this.nivel;
        this.armadura = this.armaduraBase + Math.floor(this.nivel / 2);
        this.exp = Math.floor(this.expBase * (1 + this.nivel * 0.1));
        this.oro = Math.floor(this.oroBase * (1 + this.nivel * 0.1));
        this.velocidad = this.velocidadBase + Math.floor(this.nivel / 3);
    }

    recibirDaño(personaje) {
        let dañoRecibido = Math.max(personaje.daño - this.armadura, 0);
        this.vida -= dañoRecibido;
        alert(`${this.nombre} ha recibido ${dañoRecibido} de daño. Vida restante: ${this.vida}.`);
    }

    atacar(Personaje){
        Personaje.recibirDaño(this.daño);
    }
}