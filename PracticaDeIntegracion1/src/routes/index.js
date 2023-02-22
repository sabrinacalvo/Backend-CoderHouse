const cart = require('../cart/controller.cart')
const products = require('../products/controller.products')
const messages = require('../messages/controller.messages')
const orders = require('../orders/controller.orders')
const viewsController = require('../views/controller.views')

const routes = (app) => {
  app.use('/', viewsController)
  app.use('/api/cart', cart)
  app.use('/api/products', products)
  app.use('/api/messages', messages)
  app.use('/api/orders', orders) 
}


module.exports = routes