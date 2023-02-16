const mongoose = require('mongoose');

const productsCollection = "products";

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  price: String,
  thumbnail: String,
  stock: Number
});

const productModel = mongoose.model(productsCollection, productSchema);

module.exports = productModel;
 