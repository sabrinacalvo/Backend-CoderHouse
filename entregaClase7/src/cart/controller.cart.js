const { Router, response } = require('express')
const fs = require('fs')
const CartManager = require('../CartManager.js');
const router = Router()

const cart = new CartManager("./");

// Get all Carts in file -> Just for checking.
router.get('/', async (req, res) => {
    let consultas = req.query;
    let productsList = await cart.getProducts();
    console.log(productsList)
    
    res.json( productsList )
})

// Get cart con ID -> cid
router.get("/:cid", async (req, res) => {
    let cartId = req.params.cid;
    cartId = parseInt(cartId);
  
    if (isNaN(cartId)) {
      res.send({ status: 404, message: "ID has to be a number" });
    } else {
      let response = await cart.getCartById(cartId);
      console.log(response);
      if (response != false) {  // response = "MSG", Obj or False.
        if (typeof response === "object") {
          res.send(response.objects);
        } else {
          res.send(response);
        }
      } else {
        res.send({ status: 500, message: "Server cant find the file" });
      }
    }
  });

  

router.post('/', async (req, res) => {
  let response = await cart.addCart();
  res.send(response)
  //res.json({ message: 'cart added' })
})

// post ej: /api/cart/0/product/3
router.post("/:id/product/:pid", async (req, res) => {

    let total = req.params;
    console.log(total);
    let cartId = req.params.id;
    let productId = req.params.pid;
    let response = await cart.addProductToCart(cartId, productId);

    // if (response == false) {
    //   res.send({ status: 500, message: "Server cant find the file" });
    // } else {
    //   res.send(response);
    // }

    (response == false ? res.send({ status: 500, message: "Server cant find the file" }) : res.send(response));

  });

  router.delete('/:id', async (req, res) => {
    let cartId = req.params.id;
    res.json({ mensaje: `Metodo delete de Cart Id ${cartId}` })  
  })

module.exports = router