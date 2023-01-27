const { Router } = require('express')
const { io } = require('socket.io-client')

const socket = io()

const router = Router()

router.get('/', (req, res) => {
        
    const user = {
        name: "Mate"
                
    }
    res.render('index.handlebars', { user, style: 'index.css' })
    })


router.get('/realTimeProducts', (req, res) => {
        
    const product = {
        title: "Funko Pop",
        price:  "123",
        description: "Funko POP"
        
    }
    res.render('realTimeProducts.handlebars', { product, style: 'index.css' })
    })

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