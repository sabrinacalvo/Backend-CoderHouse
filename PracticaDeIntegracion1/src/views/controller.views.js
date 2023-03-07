const { Router } = require('express')
const { io } = require('socket.io-client')
const ProductDbManager = require('../dao/dbManagers/products.dbManager')

const pm1 = new ProductDbManager();
const socket = io()

const router = Router()

// RealTimeProducts
router.get('/realtimeproducts', async (req, res)=> {
    const products = await pm1.getProducts();
    const renderObj = {
        products: products
    }
    res.render('realTimeProducts', renderObj);
});

router.get('/chat', async (req, res)=> {
    res.render('chat.handlebars');
});

router.get('/cookies', (req, res) => {
    res.render('cookies.handlebars')
})

router.get('/signup',(req, res) => {
    res.render('signup.handlebars')
})

router.get('/login', async (req,res)=> {
    res.render('login.handlebars');
})

// router.post('/', (req, res) => {
//      socket.emit('newProduct', product)
//         const product = {
//             title: "Mate",
//             price:  "123",
//             description: "Funko POP",
//         }   

// res.render('index.handlebars', { product, style: 'index.css' })
// })

module.exports = router 