// require('dotenv').config()
const dotenv = require('dotenv')

dotenv.config()

const config = {
    port: process.env.PORT || 8080,
    db: {
        userDB: process.env.USER_DB,
        passDB: process.env.PASS_DB,
        hostDB: process.env.HOST_DB
    },
    session: {
        sessionSecret: process.env.SESSION_SECRET
    }
}

module.exports =  config