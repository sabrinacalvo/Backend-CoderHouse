const jwt = require('jsonwebtoken')
const config = require('../config/index')

const { jwt_secret_key } = config.app;
const SECRET_KEY = jwt_secret_key;

exports.generateToken = (user) => {
const token = jwt.sign({ user }, SECRET_KEY, {expiresIn: '300s'})
return token
}

exports.authToken = (req, res, next) => {
    
    const authHeader = req.headers.authorization
    
    if(!authHeader) return res.status(401).json({error: 'Not authenticated'})
    const token = authHeader.split(' ')[1]
    
    jwt.verify(token, SECRET_KEY, (error, credentials) => {
        if(error) return res.status(403).json({error: 'Not authorized'})

        req.user = credentials.user

        next()
    })
}

exports.isValidToken = token => jwt.verify(token, SECRET_KEY);
