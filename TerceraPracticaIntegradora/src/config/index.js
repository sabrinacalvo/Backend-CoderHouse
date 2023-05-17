// require('dotenv').config()
const dotenv = require('dotenv')

dotenv.config({
    path: `./.env.${process.env.NODE_ENV}`,
    
})


const config = {
    app: {
        port: process.env.PORT || 8080,
        persistence: process.env.PERSISTENCE,
        environment: process.env.NODE_ENV || 'development',
    },
    db: {
        userDB: process.env.USER_DB,
        passDB: process.env.PASS_DB,
        hostDB: process.env.HOST_DB
    },
    email: {
        EMAIL_SERVICE: process.env.EMAIL_SERVICE,
        EMAIL_PORT: process.env.EMAIL_PORT,
        EMAIL_USER: process.env.EMAIL_USER,
        EMAIL_PASSWORD: process.env.EMAIL_PASSWORD

    }
}

module.exports = config