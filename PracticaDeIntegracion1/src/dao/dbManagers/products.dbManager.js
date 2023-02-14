const productsModel = require('../models/products.model');
const fs = require('fs');

class ProductDbManager {
  constructor() {
    this.file = `${process.cwd()}/products.json`
    console.log("Products MongoDb Started");
  }

  async loadProducts() {
    if (fs.existsSync(this.file)) {
      const data = await fs.promises.readFile(this.file)
      const res = JSON.parse(data)
      return res
    }
    return(`No se encontro el archivo ${this.file}`)
  }

  getProducts = async () => {
    let products = await productsModel.find();
    return products.map((product) => product.toObject());
  };

  getProductById = async (id) => {
    let product = await productsModel.findOne({ _id: id });
    return product;
  };

  saveProduct = async (product) => {
    let result = await productsModel.create(product);
    return result;
  };

  updateProduct = async (id, product) => {
    let result = await productsModel.updateOne({ _id: id }, product);
    return result;
  };

  deleteProduct = async (id) => {
    let result = await productsModel.deleteOne({ _id: id });
    return result;
  };
}

module.exports = ProductDbManager
 