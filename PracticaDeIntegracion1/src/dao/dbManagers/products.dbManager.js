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
      console.log("loading products from file", this.file );
      return res
    }
    return(`No se encontro el archivo ${this.file}`)
  }

  // getProducts = async () => {
  //   let products = await productsModel.find();
  //   return products.map((product) => product.toObject());
  // };

  getProducts = async (limit, page, query, sort) => {
    let filter = {};
    query? filter = {category: query} : filter = {};

    const options = {
        limit,
        page,
        sort: {price: sort}
    }

    try {
        const data = await productsModel.paginate(filter, options);
        const response = {
            status: "success",
            payload: data,
            totalPages: data.totalPages,
            prevPage: data.prevPage,
            nextPage: data.nextPage,
            page: data.page,
            hasPrevPage: data.hasPrevPage,
            hasNextPage: data.hasNextPage,
            prevLink: `http://localhost:3000/products?limit=${limit}&page=${data.prevPage}`,
            nextLink: `http://localhost:3000/products?limit=${limit}&page=${data.nextPage}`
        } 
        return response
    } catch (error) {
        console.log(error);
    }
}

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
 