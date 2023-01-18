const fs = require('fs')
const productosFileName = "productos.json"

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    getProducts = async() => {
        let productFile = (`${this.path}productos.json`)
        console.log(process.cwd())
        if (fs.existsSync(productFile)) {
            const objects = await JSON.parse(fs.readFileSync(productFile, "utf-8"));
            return objects;
        } else { 
            console.log("No se encontró el archivo:", productFile);
            return [];
        }
    }

    getProductById = async(id) => { 
        let productFile = (`${this.path}${productosFileName}`)
        if (fs.existsSync(productFile)) {
            const objects = await JSON.parse(fs.readFileSync(productFile));
            
            let idToSearch = (element) => element.id === id;
            let position = await objects.findIndex(idToSearch);
            if (position == -1) {
                return "No existe ningún producto con ese ID"
            } else {
                return objects[position];
            }
        } else {
            console.log("No existe archivo");
        }
    }
}


module.exports = ProductManager