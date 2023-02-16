const express = require('express')
const { Server } = require('socket.io')
const handlebars = require('express-handlebars')
const morgan = require('morgan')
const mongoose = require('mongoose');
const routes = require('./routes/index')
const viewsRouter = require('./routes/views.routes')
const ProductDbManager  = require('./dao/dbManagers/products.dbManager.js');
const messageManager = require('./dao/dbManagers/messages.dbManager')
// const port = 8080
const config = require('./config');

const {port} = config 

const app = express();

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
  console.log("Estos son los mensajes:", msglist)
  let products = await pm1.getProducts();

  socket.on("products", (data) => {
    console.log('data1', data)
    io.emit(data);
  });

  socket.on("message", data => {
    console.log(data)
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
    console.log('data2', data)
     products.push(data);
     io.emit("productsList", products);
  });
 });

module.exports = io

    




