const Router = require('express');
const Order = require('../dao/dbManagers/order.dbManager.js');

const router = new Router();
const order = new Order();

router.get("/", async (req, res) => {
    const orders = await order.getAll()
    res.send( orders );
});

router.post("/reports", async (req,res) => {
    const reports = await order.getReport(req)
    res.json(reports)
})

router.post('/', async (req, res) => {
    try {
      order.loadOrders();
      res.json({ message: "Orders Loaded" })
    } catch (error) {
      res.status(500).json({ error })
    }
})

router.delete('/', async (req, res) => {
    await order.clearAll();
    res.json({ message: 'Órdenes eliminada' })
})
module.exports = router;

