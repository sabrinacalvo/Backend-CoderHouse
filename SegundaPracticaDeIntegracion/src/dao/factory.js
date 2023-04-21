const config = require("../config/index.js");
const mongoDB = require("../db/mongo.db.js");

const { persistence } = config.app;

let ProductDAO;
let CartDAO;
let UserDAO;

switch (persistence) {
    case 'MONGO':
        mongoDB.getInstance();

        const ProductDbManager = require('./dbManagers/products.dbManager.js');
        ProductDAO = new ProductDbManager();

        const CartManager = require('./dbManagers/carts.dbManager.js');
        CartDAO = new CartManager();

        const UserManager = require('./dbManagers/user.dbManager.js');
        UserDAO = new UserManager();

        console.log('MongoDB as storage persistence');
        break;
        
    case 'FILES':
        const ProductManager = require("./fileManagers/ProductManager.js");
        const productsPath = __dirname + '/fileManagers/';
        ProductDAO = new ProductManager(productsPath);

        const FileCartManager = require("./fileManagers/CartManager.js");
        const cartPath = __dirname + '/fileManagers/';
        CartDAO = new FileCartManager(cartPath);

        const FileUserManager = require("./fileManagers/UserManager.js");
        const usersPath = __dirname + '/fileManagers/';
        UserDAO = new FileUserManager(usersPath);

        console.log('Local Files as storage persistence');
        break;
}

module.exports = { ProductDAO, CartDAO, UserDAO }

