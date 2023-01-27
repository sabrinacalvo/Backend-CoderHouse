
const productManager = require('../src/ProductManager.js');
const express = require('express')
const routes = require('./routes/index')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const viewsRouter = require('./routes/views.routes')
const morgan = require('morgan')


// const port = 8080

const config = require('./config')
const {port} = config 

const app = express();

// const pm1 = new productManager("./dataBase.json");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))


routes(app) 

// Socket

const httpServer = app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`)
})

const io = new Server(httpServer)

io.on('connection', (socket) => {
    console.log(`Cliente conectado, ${socket.id}`)
    socket.on('disconnect', () => {
        console.log('Cliente desconectado')
    })
    socket.on('newProduct', product => {
        socket.emit('addProduct', product)
    }) 

})
    
// handlebars

app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname+'/views')
app.use(express.static(__dirname + '/public'))



