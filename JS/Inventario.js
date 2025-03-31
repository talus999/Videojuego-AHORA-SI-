
export class Inventario {
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

    buscarObjeto(nombre) {
        for (let objeto of this.inventario) {
            if (objeto && objeto.descripcion.toLowerCase() === nombre.toLowerCase()) {
                return objeto;
            }
        }
        return null;
    }

    tirarObjeto(objeto){
        let indice = this.inventario.indexOf(objeto);

        if (indice !== -1){
            this.inventario[indice] = null;
        }
    }

}