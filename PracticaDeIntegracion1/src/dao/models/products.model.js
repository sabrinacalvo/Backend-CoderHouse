const mongoose = require('mongoose');
// paginacion
const mongoosePaginate = require('mongoose-paginate-v2')
const productsCollection = "products";

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  price: String,
  thumbnail: String,
  stock: Number,
  available: Boolean,
  category: String
});

const productModel = mongoose.model(productsCollection, productSchema);

module.exports = productModel;
 