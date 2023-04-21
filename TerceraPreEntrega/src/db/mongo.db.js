const mongoose = require("mongoose");
const config = require("../config/index.js");

const { userDB, passDB, hostDB } = config.db;
const url = `mongodb+srv://${userDB}:${passDB}@${hostDB}?retryWrites=true&w=majority`;
console.log("LA URL DE MONGO", url)
const options = {useNewUrlParser: true, useUnifiedTopology: true};

class mongoConnection {
    static #instance;

    static getInstance() {
        if(this.#instance) {
            console.log('MongoDB is already connected');
            return this.#instance;
        }

        mongoose.set("strictQuery", false);
        mongoose.connect(url, options)
            .then((connection) => {
                this.#instance = connection;
                console.log('MongoDB succesfully connected');
                return this.#instance;
            })
            .catch(error => {console.log('Failed to connect to MongoDB.', error)});
    }
}

module.exports = mongoConnection;