const mongoose = require('mongoose')

const orderCollection = 'orders'

const orderSchema = new mongoose.Schema({
      name: String,
      size: {
        type: String,
        enum: ["small", "medium"],
        default: "medium"
      },
      price: Number,
      quantity: Number
})

const orderModel = mongoose.model(orderCollection, orderSchema);

module.exports = orderModel