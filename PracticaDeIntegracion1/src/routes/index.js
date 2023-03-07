const cart = require('../cart/controller.cart')
const products = require('../products/controller.products')
const messages = require('../messages/controller.messages')
const orders = require('../orders/controller.orders')
const viewsController = require('../views/controller.views')
const cookiesController = require('../cookies/controller.cookies')
const sessionController = require('../session/controller.session')
const usersControler = require('../../src/users/controller.users')
const authController = require('../../src/auth/controller.auth')


const routes = (app) => {
  app.use('/', viewsController)
  app.use('/api/cart', cart)
  app.use('/api/products', products)
  app.use('/api/messages', messages)
  app.use('/api/orders', orders) 
  // app.use('/cookies', cookiesController)
  // app.use('/session', sessionController)
  // app.use('/users', usersControler)
  app.use('/auth', authController)
}


module.exports = routes