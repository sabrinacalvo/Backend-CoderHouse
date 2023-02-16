const cart = require('../cart/controller.cart')
const products = require('../products/controller.products')
const messages = require('../messages/messages.controller')
const viewsController = require('../views/controller.views')
//const orderController = require('../orders/controller.orders')

const routes = (app) => {
  app.use('/', viewsController)
  app.use('/api/cart', cart)
  app.use('/api/products', products)
  app.use('/api/messages', messages)
  //app.use('/orders', orderController)
  
}


module.exports = routes