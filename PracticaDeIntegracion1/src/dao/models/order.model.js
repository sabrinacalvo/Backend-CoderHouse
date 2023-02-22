const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const orderCollection = 'orders'

const orderSchema = new mongoose.Schema({
      name: String,
      category: {
        type: String,
        enum: ["funko", "t-shirt", "cup", "cd"],
        default: "cd"
      },
      price: Number,
      quantity: Number,
      date : Date
})

const orderModel = mongoose.model(orderCollection, orderSchema);

module.exports = orderModel