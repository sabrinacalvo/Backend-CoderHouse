// require('dotenv').config()
const dotenv = require('dotenv')

dotenv.config()

const config = {
    port: process.env.PORT || 8080
}

module.exports =  config