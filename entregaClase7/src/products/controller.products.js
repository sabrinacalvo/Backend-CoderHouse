const { Router } = require('express')
const fs = require('fs')
const ProductManager = require('../ProductManager.js');
const router = Router()

const pm1 = new ProductManager("./");

// Get all Products in file
router.get('/', async (req, res) => {
  let consultas = req.query;
  let productsList = await pm1.getProducts();
  console.log(productsList)
  
  res.json( productsList )
})

const convertToNumber = (req, res, next) => {
  req.params.id = Number(req.params.id)
  next()
}

// Get product with id
router.get('/:id', convertToNumber, async (req, res) => {
  let id = req.params.id;
  let product = await pm1.getProductById(id);

  typeof product === "object" ? res.json(product) : res.send({ status: 500, message: "Server cant find the file" });
  }
)

router.post('/', (req, res) => {
  res.json({ message: 'POST detected' })
})

module.exports = router