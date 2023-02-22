const cartModel = require('../models/carts.model.js');

class CartDbManager {
  constructor() {
    console.log("Cart MongoDb Started");
  }

  getProducts = async () => {
    let carts = await cartModel.find();
    return carts.map((cart) => cart.toObject());
  };

  getCartById = async (id) => {
    let cart = await cartModel.findOne({ _id: id });
    return cart;
  };

  addProductToCart = async (cartId, productId) => {
    let cart = await cartModel.findOne({ _id: id });
    //add productId to Cart
    result = res.status(200).json('Product added to Cart')
    return result;
  }

  createCart = async (cart) => {
    let result = await cartModel.create(cart);
    return result;
  };

  updateCart = async (id, cart) => {
    let result = await cartModel.updateOne({ _id: id }, cart);
    return result;
  };

  deleteCart = async (id) => {
    let result = await cartModel.deleteOne({ _id: id });
    return result;
  };
}

module.exports = CartDbManager