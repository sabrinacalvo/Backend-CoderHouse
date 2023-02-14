const mongoose = require('mongoose');

const productsCollection = "products";

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: Number,
  stock: Number
});

const productModel = mongoose.model(productsCollection, productSchema);

module.exports = productModel;
 