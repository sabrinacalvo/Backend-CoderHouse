const Router = require('express');
const Order = require('../dao/dbManagers/order.dbManager.js');

const router = new Router();
const order = new Order();

router.get("/", (req, res) => {
    res.send({ status: "Ok", postMessage: "Order Get" });
});

router.post("/", (req, res) => {
    res  = ({ message: "Esto es un post Order"})

});

module.exports = router;

