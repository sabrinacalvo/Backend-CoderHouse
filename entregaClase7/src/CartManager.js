const fs = require('fs');

const carritoFileName = "carrito.json"
const productosFileName = "productos.json"

class CartManager {
  constructor(path) {
    this.path = path;
  }

  getProducts = async() => {
      let carritoFile = (`${this.path}${carritoFileName}`);
      if (fs.existsSync(carritoFile)) {
          const objects = await JSON.parse(fs.readFileSync(carritoFile, "utf-8"));
          return objects;
      } else { 
          console.log("No se encontró el archivo", carritoFileName);
          return [];
      }
  }

  addCart = async () => {
    let carritoFile = (`${this.path}${carritoFileName}`);
    let newCartId = 0;

    if (fs.existsSync(carritoFile)) {
      // Carrito existe, se agrega uno nuevo.
        let cartsArray = await JSON.parse(fs.readFileSync(carritoFile, "utf-8"));
        
        let lastCart = await cartsArray.pop();
        cartsArray.push(lastCart);
        console.log(cartsArray);
        //  New cart with New ID
        let newCart = {
          id: lastCart.id + 1,
          objects: [],
        };
        newCartId = lastCart.id + 1;

        cartsArray.push(newCart);
        console.log(cartsArray);

        cartsArray = JSON.stringify(cartsArray);
        fs.writeFileSync(carritoFile, cartsArray);
    } else {
        // Carrito no existe, se crea.
        let newCart = {
          id: 0,
          objects: [],
        };
        let cartsArray = [newCart];
        cartsArray = JSON.stringify(cartsArray);
        fs.writeFileSync(carritoFile, cartsArray);
    }

    return `Cart ID ${newCartId}`;
  };

  getCartById = async (id) => {
    let carritoFile = (`${this.path}${carritoFileName}`);
    if (fs.existsSync(carritoFile)) {
      let cartsArray = await JSON.parse(fs.readFileSync(carritoFile, "utf-8"));
      let cart = cartsArray.find((element) => element.id == id);

      return (cart == undefined ? "No hay un cart con ese ID" : cart); 
    } else {
      return false;
    }
  };

  addProductToCart = async (cartId, productId) => {
    let carritoFile = (`${this.path}${carritoFileName}`)
    let productosFile = (`${this.path}${productosFileName}`)
    
    if (fs.existsSync(carritoFile) && fs.existsSync(productosFile)) {
      let cartsArray = await JSON.parse(fs.readFileSync(carritoFile, "utf-8"));
      // Get carrito with ID
      let cart = cartsArray.find((element) => element.id == cartId);

      if (cart == undefined) {
        return "No se encuentra ningun carrito con ese ID";
      } else {
        let products = await JSON.parse(fs.readFileSync(productosFile, "utf-8"));
        console.log(products);
        // Get product with ID
        let product = products.find((element) => element.id == productId);

        if (product == undefined) {
          return "No se encuentra ningun producto con ese ID";
        } else {
          let idToSearch = (element) => element.id === productId;
          // Get Cart index in CartArray
          let position = await cart.objects.findIndex(idToSearch);

          if (position === -1) {
            // Product not exist in Cart, adding stock.
            cart.objects.push({ id: productId, stock: 1 });
          } else {
            // Product exists, add stock.
            let cartProduct = cart.objects[position];
            cartProduct.stock += 1;
            console.log("Adding ",cartProduct);
            cart.objects.splice(position, 1, cartProduct);
          }

          let cartIdToSearch = (element) => element.id == cartId;
          let cartPos = await cartsArray.findIndex(cartIdToSearch);
          cartsArray.splice(cartPos, 1, cart);
          cartsArray = JSON.stringify(cartsArray);
          fs.writeFileSync(carritoFile, cartsArray);
          return "Producto agregado con exito";  // Deberia devolver status: ok? 
        }
      }
    } else {
      // carritoFile o productosFile not exists
      return false;
    }
  };
}

module.exports = CartManager