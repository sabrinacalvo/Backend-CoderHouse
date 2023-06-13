const orderModel = require('../models/order.model');

class Order {
  constructor() {
    console.log("Order MongoDb Started");
  };

  getAll = async () => {
    let orders = await orderModel.find();
    orders = orders.map((order) => order.toObject());
    return orders;
  };

  // loadOrders = async() => {
  //   return "Orders upload from file"
  // }

  getReport = async (p) => {
  const category = "cd"
    console.log("filtro: ", category)
    try {
      const orders = await orderModel.aggregate([
        {
          $match: { category }
        },
        // {
        //   $group: { _id: '$title', totalQuantity: { $sum: '$quantity' } }
        // },
        // {
        //   $sort: { totalQuantity: -1 }
        // },
        // {
        //   $group: { _id: 1, orders: { $push: "$$ROOT" } }
        // },
        // {
        //   $project: { "_id": 0, orders: "$orders" }
        // },
        {
          $merge: { into: "reports" }
        }
      ])
      console.log(orders)
      return JSON.orders 
    } catch (error) {
      return "error 500: ",error
    }
  }

  addOrder = async (order) => {
    let result = await orderModel.create(order);
    return result;
  };

  clearAll = async () => {
    let result = await orderModel.deleteMany();
    return result;
  };
}

module.exports = Order

