import productManager from "../src/ProductManager.js";
import express from "express";

const app = express();
const pm1 = new productManager("./dataBase.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => console.log("Servidor en el puerto 8080"));

// Endpoint "/products"
app.get("/products", async (req, res) => {
  // http://localhost:8080/products?limit=5
  let consultas = req.query;
  
  let productsList = await pm1.getProducts();
  console.log(productsList)
  if (!consultas.limit) {
    res.send({ status: "OK", message: productsList });
  } else {
    let limitedArray = productsList.slice(0, consultas.limit);
    res.send({ status: "OK", message: limitedArray });
  }
});

// Get productos con ID
app.get("/products/:pid", async (req, res) => {
  // Ej: http://localhost:8080/products/1
  let pid = req.params.pid;
  pid = parseInt(pid);

  let product = await pm1.getProductById(pid);

  res.send({ status: "Ok", message: product });
});