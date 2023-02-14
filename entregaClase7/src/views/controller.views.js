const { Router } = require('express')
const { io } = require('socket.io-client')
const pm1 =require('../ProductManager')

const socket = io()

const router = Router()

router.get('/', (req, res) => {
        
    const user = {
        name: "Mate"
                
    }
    res.render('index.handlebars', { user, style: 'index.css' })
    })


// router.get('/realTimeProducts', (req, res) => {
        
//     const product = {
//         title: "Funko Pop",
//         price:  "123",
//         description: "Funko POP"
        
//     }
//     res.render('realTimeProducts.handlebars', { product, style: 'index.css' })
//     })

    router.get('/realtimeproducts', async (request, response)=> {
        const products = await pm1.getProducts();
        const renderObj = {
            products: products
        }
        response.render('realTimeProducts', renderObj);
    
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