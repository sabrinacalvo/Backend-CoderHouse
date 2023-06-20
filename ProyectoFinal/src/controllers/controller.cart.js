const { Router, response } = require('express')
const fs = require('fs')
const {authToken} = require('../utils/jwt.utils')
const { CartDAO } = require('../dao/factory')
const router = Router()

const cart = CartDAO;

router.get('/', async (req, res) => {
  try {
    let cartList = await cart.getCarts();
    res.json( cartList )
  } catch (error) {
    console.log(error)
    res.status(500).json({message: 'Failed to access Carts'})
  }
})

// Get cart con ID -> cid
router.get("/:cid", async (req, res) => {
  try {
      let cartId = req.params.cid;
      let response = await cart.getCartById(cartId);
      if (response) 
          res.send(response);
      else {
          res.send({ status: 500, message: "Server cant find the Cart" });
      }  
  } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Error reading Cart'});
  }
    
});

router.get("/:cid/products", async (req, res) => {
  try {
    let cartId = req.params.cid;
    let response = await cart.getCartById(cartId);

    if (!response) res.send({ status: 500, message: "Server cant find the Cart" });
        
    const cartProducts = await cart.getProducts()
    return res.status(200).json({message: "sucess", message: cartProducts})

  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Failed to retrieve products from Cart or empty'});
  }
  
})
  

router.post('/', async (req, res) => {

    try {
      let response = await cart.createCart();
      res.send(response)

    } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Failed to create Cart'});
    }
    
  })
  

// post ej: /api/cart/0/product/3
  router.post("/:cid/product/:pid", async (req, res) => {

    let total = req.params;
    console.log("parametros: ", total);

    let cartId = req.params.cid;
    let productId = req.params.pid;

    let response = await cart.addProductToCart(cartId, productId);

    (response == false ? res.send({ status: 500, message: "Server cant find the file" }) : res.send(response));

  });

  router.delete('/:id', authToken, async (req, res) => {
    try{
      if(req.user.role !== "admin") return res.status(403).json({ status: 'failed', ok: false, response: "Can't delete, diff role." });
      let cartId = req.params.id;

      try{
        const response = await cart.deleteProductsfromCart(cartId);
        res.json({message: response});
      } catch(error) {
        req.logger.error(error);
        res.status(500).json({message: 'Failed to delete products', error: error.message});
      }

      
      res.json({ status: 200, msg: 'Cart products deleted'})
    }catch(error) {
      return (error)
    }  
  })

  router.get('/:cid/purchase', authToken, async (req, res) => {
    const { cid } = req.params;
    const user = req.user;

    try {
        const response = await cart.purchase(cid, user);
        console.log(response)
        res.status(200).json({status: 'success', msg: response})
        
    } catch(error) {
        req.logger.error(error);
        res.status(500).json({status: 'error', error: error.message});
    }
  }); 

module.exports = router