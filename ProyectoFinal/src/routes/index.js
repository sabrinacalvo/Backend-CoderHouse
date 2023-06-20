const cart = require('../controllers/controller.cart')
const products = require('../controllers/controller.products')
const messages = require('../controllers/controller.messages')
const orders = require('../controllers/controller.orders')
const viewsController = require('../views/controller.views')
const viewsTemplateController = require('../controllers/controller.viewsTemplate')
const usersController = require('../controllers/controller.users')
const authController = require('../controllers/controller.auth')
const tickets = require('../controllers/controller.tickets')
const mocking = require('../controllers/controller.mocking')
const sessionsController = require('../controllers/controller.sessions')

const routes = (app) => {
  app.use('/', viewsController)
  app.use('/',viewsTemplateController)
  app.use('/auth', authController)
  app.use('/api/cart', cart)
  app.use('/api/messages', messages)
  app.use('/api/sessions', sessionsController)
  app.use('/api/orders', orders)
  app.use('/api/products', products)
  app.use('/api/users', usersController) 
  app.use('/api/tickets', tickets) 
  app.use('/mockingproducts', mocking )    
}


module.exports = routes