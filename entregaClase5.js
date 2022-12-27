import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.exists = false;
  }

  async checkExists() {
    let exists = true;
    try {
      await fs.promises.access(this.path, fs.constants.F_OK);
    } catch (e) {
      exists = false;
    }
    this.exists = exists;
    return exists;
  }

  async getProducts() {
    try {
      if (this.exists === false) {
        let exists = await this.checkExists();
        if (exists === false) {
          await fs.promises.writeFile(this.path, "[]");
          this.exists = true;
        }
      }
      let prods = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(prods);
      return this.products;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async getMaxId() {
    try {
      await this.getProducts();
      const ids = this.products.map((el) => el.id);
      if (ids.length === 0) {
        return 0;
      }
      return Math.max(...ids);
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (title && description && price && thumbnail && code && stock) {
        let id = await this.getMaxId();
        if (this.products.some((el) => el.code === code)) {
          throw new Error(`A product with the code ${code} alredy exists`);
        }
        const product = {
          id: id + 1,
          title: title,
          description: description,
          price: price,
          thumbnail: thumbnail,
          code: code,
          stock: stock,
        };
        this.products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
        return product;
      } else {
        throw new Error("All fields are required");
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async getProductById(id) {
    await this.getProducts();
    const product = this.products.find((el) => el.id === id);
    if (product) {
      return product;
    }
    return null;
  }

  async updateProduct(id, newProduct) {
    await this.getProducts();
    const product = this.products.find((el) => el.id === id);
    if (product) {
      product.title = newProduct?.title || product.title;
      product.description = newProduct?.description || product.description;
      product.price = newProduct?.price || product.price;
      product.thumbnail = newProduct?.thumbnail || product.thumbnail;
      product.stock = newProduct?.stock || product.stock;
      const products = this.products.map((el) => (el.id === id ? product : el));
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return product;
    } else {
      throw new Error(`The product with id ${id} does not exist`);
    }
  }

  async deleteProduct(id) {
    await this.getProducts();
    const product = this.products.find((el) => el.id === id);
    if (product) {
      const products = this.products.filter((el) => el.id !== id);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } else {
      throw new Error(`The product with id ${id} does not exist`);
    }
  }
}

let pm1 = new ProductManager('./Product.json')
let res = await pm1.getProducts()
console.log(res)



