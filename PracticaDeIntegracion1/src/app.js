const express = require('express')
const { Server } = require('socket.io')
const handlebars = require('express-handlebars')
const morgan = require('morgan')
const mongoose = require('mongoose');
//const productManager = require('../src/ProductManager.js');
const routes = require('./routes/index')
const viewsRouter = require('./routes/views.routes')
const ProductDbManager  = require('./dao/dbManagers/products.dbManager.js');
const messageManager = require('./dao/dbManagers/messages.dbManager')
// const port = 8080
const config = require('./config');
// const messageModel = require('./dao/models/messages.model');
const {port} = config 

const app = express();

// const pm1 = new productManager("./products.json");
app.use(express.json()); 
app.use(express.static(__dirname +  '/public'))
console.log(__dirname)

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

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

// Socket

const httpServer = app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`)
})

const io = new Server(httpServer);

let pm1 = new ProductDbManager();
let msg = new messageManager();

io.on("connection", async (socket) => {
  console.log("Se inicio la comunicacion");

  let messages = await msg.getAll();
  let products = await pm1.getProducts();

  socket.on("products", (data) => {
    io.emit(data);
  });

  socket.on("message", data => {
    console.log(data)
    msg.addMessage(data);
    messages.push(data);

    socket.emit("Messages", messages);
  });

   socket.on("authenticated", (data) => {
    socket.broadcast.emit("newUserConnected", data);
    socket.emit("Messages", messages);
   });

   socket.emit("products", products);

   socket.on("products", (data) => {
     products.push(data);
     io.emit("products", products);
  });
 });

module.exports = io

    




