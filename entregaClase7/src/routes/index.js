const cart = require('../cart/controller.cart')
const products = require('../products/controller.products')
const viewsController = require('../views/controller.views')

const routes = (app) => {
  app.use('/', viewsController)
  app.use('/api/cart', cart)
  app.use('/api/products', products)
  
}


module.exports = routes