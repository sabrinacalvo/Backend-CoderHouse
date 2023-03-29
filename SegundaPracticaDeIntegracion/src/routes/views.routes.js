const { Router } = require('express')
const ProductManager = require('../ProductManager')
const pm1 = new ProductManager("../")

const router = Router()


// router.get("/realTimeProducts", (req, res) => {
//    res.render("realTimeProducts");
//  });


module.exports = router