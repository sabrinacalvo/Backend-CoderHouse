const { Router } = require('express')
const fs = require('fs')
//const ProductManager = require('../ProductManager.js');
const ProductDbManager = require('../dao/dbManagers/products.dbManager.js');
const productModel = require('../dao/models/products.model')
const router = Router()

//const pm1 = new ProductManager("./");
const pm1 = new ProductDbManager();

// Get all Products
// router.get('/', async (req, res) => {
//   let consultas = req.query;
//   let productsList = await pm1.getProducts();
  
//   res.json( productsList )
// })

router.get('/', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page)  || 1; 
  const query = req.query.query || null;
  const sort = req.query.sort || null;
  
  try {
      const products = await pm1.getProducts(limit, page, query, sort);
      return res.json(products);
  } catch (error) {
      console.log(error);
      res.status(500).json({message: 'Error al acceder a los productos'});
  }
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

router.post("/loadProducts", async (req, res) => {
try {
  let listProducts = await pm1.loadProducts() 
  console.log('Loading products: ', listProducts)

  const response = listProducts.map(({ id, title, description, price, thumbnail, stock, available, category }) => ({
    title,
    description,
    price,
    thumbnail,
    stock,
    available,
    category
  }))
  console.log(response)
  await productModel.insertMany(response)
} catch(error) {
  console.log(error)
}
});

router.post("/", async (req, res) => {
  let product = req.query;
  if (
    !product.title ||
    !product.description ||
    !product.price ||
    !product.stock ||
    !product.category
  ) {
    res.send({ status: 404, message: "Fill all params" });
  } else {
    if (!product.status) {
      product.status = true;
    } else {
      product.status = product.status === "true";
    }
    if (!product.thumbnails) {
      product.thumbnails = [];
    } else {
      product.thumbnails = [product.thumbnails];
    }
    product.price = parseInt(product.price);
    product.stock = parseInt(product.stock);
    if (isNaN(product.price) || isNaN(product.stock)) {
      res.send({ status: 404, message: "Price and stock need to be numbers" });
    } else {
      let response = await pm.addProduct(product);
      res.send({ status: 200, message: response });
      let products = await pm.getProducts();
      io.emit("products", products);
      console.log(response);
    }
  }
});

module.exports = router