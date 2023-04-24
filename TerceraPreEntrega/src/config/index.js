// require('dotenv').config()
const dotenv = require('dotenv')

dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`,
})

const config = {
    app: {
        port: process.env.PORT || 8080,
        persistence: process.env.PERSISTENCE
    },
    db: {
        userDB: process.env.USER_DB,
        passDB: process.env.PASS_DB,
        hostDB: process.env.HOST_DB
    }
}

module.exports = config