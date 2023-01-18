const cart = require('../cart/controller.cart')
const products = require('../products/controller.products')

const routes = (app) => {
  app.use('/api/cart', cart)
  app.use('/api/products', products)
}


module.exports = routes