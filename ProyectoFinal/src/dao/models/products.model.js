const mongoose = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2')

const productsCollection = "products";

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  stock: Number,
  available: Boolean,
  category: String,
  pcode: {
    type: String,
    index: true
  },
  owner: {
    type: String,
    default: "admin"
  }
})

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productsCollection, productSchema);

module.exports = productModel
 