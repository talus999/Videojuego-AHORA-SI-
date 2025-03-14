class Enemigo {
    constructor(nombre, vida, daño, armadura, exp, oro, velocidad){
        this.nombre = nombre;
        this.daño = daño;
        this.vida = vida;
        this.armadura = armadura;
        this.exp = exp;
        this.oro = oro;
        this.velocidad = velocidad;
    }

    recibirDaño(Personaje){
        dañoRecibido =  Personaje.daño - this.armadura
        this.vida -= dañoRecibido;
        alert(`${this.nombre} ha recibido ${dañoRecibido} de daño. Vida restante: ${this.vida}.`);
    }

    atacar(Personaje){
        Personaje.recibirDaño(this);
    }
}