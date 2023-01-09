import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    getProducts = async() => {
        if (fs.existsSync(`${this.path}`)) {
            const objects = await JSON.parse(fs.readFileSync(`${this.path}`, "utf-8"));
            return objects;

        } else { 
            console.log("No se encontró el archivo");
        }
    }

    getProductById = async(id) => { 
        if (fs.existsSync(`${this.path}`)) {
            const objects = await JSON.parse(fs.readFileSync(`${this.path}`));
            
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

export default ProductManager;