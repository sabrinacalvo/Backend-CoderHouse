const productsModel = require('../models/products.model');
const fs = require('fs');
const config = require('../../config/index')

const {port} = config.app || 8080

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

  getProductsOld = async () => {
    const products = await productsModel.find();
    return products.map((product) => product.toObject());
  };

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
            prevLink: `http://localhost:${port}/products?limit=${limit}&page=${data.prevPage}`,
            nextLink: `http://localhost:${port}/products?limit=${limit}&page=${data.nextPage}`
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

  addProduct = async (productInfo) => {
    try {
      const { pcode } = productInfo;
      const productByCode = await pm1.getByQuery({pcode: pcode});
      if(Object.keys(productByCode).length !== 0) return {status: 'failed', message: 'El producto ya se encuentra ingresado en la base de datos'};

      const added = await pm1.add(productInfo);
      const newProduct = new productsDTO(added);

      return {message: 'El producto fue ingresado correctamente', payload: newProduct};
  } catch (error) {
      throw error;
  }
  };

  saveProduct = async (product) => {
  try{
    const { pcode } = product;
    const productByCode = await productsModel.findOne({pcode: pcode});

    if(Object.keys(productByCode).length !== 0) return {status: 'failed', message: 'El producto ya se encuentra ingresado en la base de datos'};
    
    let result = await productsModel.add(product);

    return {message: 'El producto fue ingresado correctamente', payload: result};

  } catch (error) {
      throw error;
  }
  };

  updateProduct = async (id, product) => {
    let result = await productsModel.updateOne({ _id: id }, product);
    return result;
  };

  deleteProduct = async (id) => {
    let result = await productsModel.deleteOne({ _id: id });
    return result;
  };

  deleteAll = async () => {
    let result = await productsModel.deleteMany();
    return result;
  };
}

module.exports = ProductDbManager
 