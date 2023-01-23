
const productManager = require('../src/ProductManager.js');
const express = require('express')
const routes = require('./routes/index')
const port = 8080
const app = express();


// const pm1 = new productManager("./dataBase.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


routes(app)

app.listen(port, () => console.log(`Servidor en el puerto ${port}`));
