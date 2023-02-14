const { Router } = require('express')
const ProductManager = require('../ProductManager')
const pm1 = new ProductManager("../")

const router = Router()

router.get('/',  async (req, res) => {
   let products = await pm1.getProducts()
   res.render('index.handlebars', { products })
})

router.get("/realTimeProducts", (req, res) => {
   res.render("realTimeProducts");
 });


module.exports = router