const express = require('express')
const { Server } = require('socket.io')
const morgan = require('morgan')
const mongoose = require('mongoose');
const routes = require('./routes/index')
const ProductDbManager  = require('./dao/dbManagers/products.dbManager.js');
const messageManager = require('./dao/dbManagers/messages.dbManager')
const config = require('./config');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const FileStore = require('session-file-store')
const handlebars = require('express-handlebars')


const {port} = config 

const app = express();



app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname +  '/public'))
app.use(cookieParser());
app.use(session({
    store:MongoStore.create({
      mongoUrl: 'mongodb+srv://admin:tbMJI5k27RWXs5jO@ecommerce.nrktv74.mongodb.net/?retryWrites=true&w=majority',
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
       ttl: 15,
     }),
     secret: 'loQueQuieras',
     resave: false,
     saveUninitialized: false
 }))

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

// mongoose.connect('mongodb+srv://admin:tbMJI5k27RWXs5jO@ecommerce.nrktv74.mongodb.net/?retryWrites=true&w=majority')
//   .then(response => console.log('db is connected'))
//   .catch(error => console.log(error))

 mongoose.set("strictQuery", false);
 const connection = mongoose.connect(
     "mongodb+srv://admin:tbMJI5k27RWXs5jO@ecommerce.nrktv74.mongodb.net/?retryWrites=true&w=majority"
 );

// handlebars

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')
app.use(express.static(__dirname + '/public'))

routes(app) 

const httpServer = app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`)
})

// Socket
const io = new Server(httpServer);

var pm1 = new ProductDbManager();
var msg = new messageManager();

io.on("connection", async (socket) => {
  console.log("Se inicio la comunicacion");

  let msglist = await msg.getAll();
  console.log("IO leyendo mensajes");
  let products = await pm1.getProducts();
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

    




