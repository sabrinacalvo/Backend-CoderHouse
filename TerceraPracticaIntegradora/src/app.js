const express = require('express')
const { Server } = require('socket.io')
const mongoose = require('mongoose');
const ProductDbManager  = require('./dao/dbManagers/products.dbManager.js');
const messageManager = require('./dao/dbManagers/messages.dbManager')
const handlebars = require('express-handlebars')
const morgan = require('morgan')
const routes = require('./routes/index')
const viewsRouter = require('./routes/views.routes')
const config = require('./config')
const session = require('express-session')
const FileStore = require('session-file-store')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const initializePassport = require('./config/passport.config')
const errorHandler = require ('./middlewares/errors/handler.errors.js')
const addLogger = require('../src/middlewares/logger.middlewares.js')
const { faker } = require('@faker-js/faker')
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUiexpress = require('swagger-ui-express')

const {port} = config.app

const fileStore = FileStore(session)

const app = express();


app.use(express.json()); 
app.use(express.static(__dirname +  '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(session({
  store:MongoStore.create({
    mongoUrl:'mongodb+srv://admin:tbMJI5k27RWXs5jO@ecommerce.nrktv74.mongodb.net/40305-sessions?retryWrites=true&w=majority',
    mongoOptions: { useNewUrlParser:true, useUnifiedTopology: true },
    ttl:15,
   }),
  secret: 'abcdefg',
  resave: false,
  saveUninitialized: false
}))

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: 'Documentacion de Adoptme',
      description: 'Encontraras los métodos necesarios para trabajar con la API',
    },
  },

  apis: [`${__dirname}/docs/**/*.yaml`],
}
const specs = swaggerJsdoc(swaggerOptions)

app.use('/apidocs', swaggerUiexpress.serve, swaggerUiexpress.setup(specs))





initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(addLogger)
app.use(errorHandler);




  // mongoose.set("strictQuery", false);
  // const connection = mongoose.connect(
  //    "mongodb+srv://admin:tbMJI5k27RWXs5jO@ecommerce.nrktv74.mongodb.net/Data?retryWrites=true&w=majority"
  // );


app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')
app.use(express.static(__dirname + '/public'))


routes(app) 



app.get('/logger', (req, res) => {
  req.logger.warn('Alerta')
  res.send({message:"Prueba logger"})
})

//Este endpoint sirve para poder crear el usuario virtual con variables para utilizar en el resto de endpoints
app.get('/api/test/user',(req,res)=>{
  let first_name = faker.name.firstName();
  let last_name = faker.name.lastName();
  let email = faker.internet.email();
  let password =  faker.internet.password();
  res.send({first_name,last_name,email,password})
})



const httpServer = app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`)
})


const io = new Server(httpServer);

var pm1 = new ProductDbManager();
var msg = new messageManager();

io.on("connection", async (socket) => {
  console.log("Se inicio la comunicacion");

  let msglist = await msg.getAll();
  console.log("IO leyendo mensajes");
  let products = await pm1.getProductsOld();
  console.log("IO leyendo productos");

  socket.on("products", (data) => {
    console.log('data1', data)
    io.emit(data);
  });

  socket.on("message", data => {
    msg.addMessage(data);
    msglist.push(data);
    io.emit("messageLogs", msglist);
  });

   socket.on("authenticated", (data) => {
    socket.broadcast.emit("newUserConnected", data);
    socket.emit("messages", msglist);
   });

   socket.emit("productsList", products);

   socket.on("productsList", (data) => {
     products.push(data);
     io.emit("productsList", products);
  });
 });

module.exports = io

    




