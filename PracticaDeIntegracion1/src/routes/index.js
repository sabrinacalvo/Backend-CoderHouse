const cart = require('../cart/controller.cart')
const products = require('../products/controller.products')
const messages = require('../messages/controller.messages')
const orders = require('../orders/controller.orders')
const viewsController = require('../views/controller.views')
const viewsTemplateController = require('../viewsTemplate/controller.viewsTemplate')
const usersController = require('../users/controller.users')
const authController = require('../auth/controller.auth')

const routes = (app) => {
  app.use('/', viewsController)
  app.use('/api/cart', cart)
  app.use('/api/products', products)
  app.use('/api/messages', messages)
  app.use('/api/orders', orders) 
  app.use('/',viewsTemplateController)
  app.use('/users', usersController)
  app.use('/auth', authController)
}


module.exports = routes