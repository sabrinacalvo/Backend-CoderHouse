const cartModel = require('../models/carts.model.js');
//const ProductDbManager = require ('../dbManagers/products.dbManager.js')
const productModel = require('../models/products.model');
const TicketDbManager = require('../dbManagers/ticket.dbManager');


const ticket1 = new TicketDbManager()

class CartDbManager {
  constructor() {
    
  }

  getCarts = async () => {
  try {
      let response = await cartModel.find();
      return response
    } catch (error) {
      console.log(error);
      throw error;
  }};

  getProducts = async () => {
  try {
    let response = await cartModel.Products
    return response
  } catch(error) {
    console.log(error)
    throw error;
  }};
  
  getCartById = async (id) => {
  try {
    let response = await cartModel.findOne({ _id: id });
    if (response) 
      return response
    else return {}
  } catch (error) {
    console.log(error);
    throw error;
  }};

  getProductIndex = async (pid, cartId) => {
    try {
        let cart = await cartModel.findOne({ _id: cartId });
        if (!cart) return 
          const index = cart.products.findIndex(prod => prod.product.equals(pid));
        return index;
    } catch(error) {
        throw error;
    }
  };

  addProductToCart = async (cid, productId) => {
  try{   
    const cart = await cartModel.findOne({ _id: cid });
    if (!cart) return {status: 'failed', message: 'Cart does not exist' };
    const productToAdd = await productModel.findOne({ _id: productId })
    if (!productToAdd) return {status: 'failed', message: 'Product id does not exist' };

    let isProdInCart = cart.Products.findIndex(prod => prod.product.equals(productId));
   
    if (!cart.Products) {
      cart.Products = [];
    }

    // ProdInCart = -1 if not product present.
    if(isProdInCart >= 0 ) {
      cart.Products[isProdInCart].quantity++;
      console.log("Product exists, adding to stock") }
    else 
      cart.Products.push({ product: productToAdd.id, quantity: 1 });

    await cartModel.updateOne({ _id: cid }, cart);

    return { status: 'success', ok: true, message: 'Product was added to cart'}
  } catch (error) {
    console.log(error);
    throw error;
  }};

  deleteProductfromCart = async (cid, pid) => {
    try {
        const cart = await cartModel.getById(cid);
        if (!cart) return {status: 'failed', message: 'Invalid CartID'};
        if(cart.Products.length === 0) return {status: 'failed', message: 'None products to delete found'};

        const productIndex = await cartModel.getProductIndex(pid, cart);
        if(productIndex === -1) return {status: 'failed', message: 'El producto no se encontró en el carrito'};

        cart.products.splice(productIndex, 1);
        await cartModel.updateOne(cid, cart);
        return {status: 'success', message: 'Producto eliminado del carrito'};
    } catch (error) {
        throw error;
  }};

  createCart = async (cart) => {
  try{
    let result = await cartModel.create(cart);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }};

  updateCart = async (id, cart) => {
  try{
    let result = await cartModel.updateOne({ _id: id }, cart);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }};

  deleteCart = async (id) => {
  try{
    let result = await cartModel.deleteOne({ _id: id });
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }};

  deleteMany = async() =>{
    try{
        await cartModel.deleteMany();
        return { status: 'success', message: 'Products were removed'}
      } catch (error) {
        console.log(error);
        throw error;
      }
  };

  purchase = async (cid, user) => {
    try {
          const cart = await cartModel.findOne({ _id: cid });
          console.log(cart)
          if (!cart) return {status: 'failed', message: 'Cart ID not exist'};
          const products = cart.Products;
          if (products.length == 0) return {status: 'failed', message: 'No products to add'};

          let purchasedProducts = [];

          for (const prod of products) {
              let id = prod.product.id
              let price = prod.product.price;
              let quantity = prod.quantity;

              let product = await productModel.find(prod.product);

              if (quantity <= product[0].stock) {
                
                try {
                  product[0].stock= product[0].stock - quantity
                  await productModel.updateOne(prod.id, product);
                  const subtotal = price * quantity;
                  const item = {
                      product: id,
                      subtotal
                  };
                  purchasedProducts.push(item);
                  console.log("Item added", item)
                  const prodIndex = await cartModel.getProductIndex(id, cart);
                  console.log("INDEX: ", prodIndex)

                  cart.products.splice(prodIndex, 1);
                  
                  return {status: 'success', ok: true, message: 'Purchase done'};
                } catch (error) {
                    throw error;
                }
              }
          } //for_end
          
          if(purchasedProducts.length === 0) return {status: 'failed', message: 'Purchase incomplete or some error.'}

          const amount = purchasedProducts.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.subtotal;
          }, 0);

          const ticketInfo = {
            purchase_datetime : Date.now,
            total: amount,
            purchaser: user,
            code : 123
          };
          
          console.log("TIKET1", ticketInfo)
          const currentTicket= await ticket1.createTicket(ticketInfo);
          console.log("TIKET2", currentTicket)
          return {message: 'Compra realizada exitosamente', payload: currentTicket};
          // } catch(error) {
          //     throw error;
          // }
         
    } catch (error) {
      console.log(error)
      throw error
    }

}};
  
module.exports = CartDbManager