
class Inventario {
    constructor(){
        this.capacidad = 5;
        this.inventario = new Array (this.capacidad).fill(null);
    }

    añadirAInventario(objeto) {
        let indiceVacio = this.inventario.indexOf(null); 

        if (indiceVacio !== -1) {
            this.inventario[indiceVacio] = objeto;
            console.log(`${objeto} se ha añadido al inventario.`);
        } else {
            console.log(`Tu inventario está lleno, idiota.`);
        }
    }

    tirarObjeto(objeto){
        let indice = this.items.indexOf(objeto);

        if (indice !== -1){
            this.inventario[indice] = null;
            alert(`Has tirado ${objeto}. Observa como se destruye y no lo puedes recuperar, idiota.`)
        }
    }

}