const { Router } = require('express')
const { io } = require('socket.io-client')
const ProductDbManager = require('../dao/dbManagers/products.dbManager')

const pm1 = new ProductDbManager();
const socket = io()

const router = Router()


router.get('/realtimeproducts', async (req, res)=> {
    const products = await pm1.getProductsOld();
    const renderObj = {
        products: products
    }
    res.render('realTimeProducts', renderObj);
});

router.get('/chat', async (req, res)=> {
    res.render('chat');

});


router.post('/', (req, res) => {
     socket.emit('newProduct', product)
        const product = {
            title: "Mate",
            price:  "123",
            description: "Funko POP",
            

        }

     
    
    
    res.render('index.handlebars', { product, style: 'index.css' })
    })
    


module.exports = router 