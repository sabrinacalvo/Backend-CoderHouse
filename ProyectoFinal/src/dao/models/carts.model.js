const mongoose = require('mongoose');

const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  //products = []
  Products: {
    type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products'
            },
            quantity: Number
    }],
    default: []
}
});

cartSchema.pre('findOne', function () {
  this.populate('Products.product');
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

module.exports = cartModel;