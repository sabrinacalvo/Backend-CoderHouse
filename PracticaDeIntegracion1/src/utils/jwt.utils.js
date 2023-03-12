const jwt = require('jsonwebtoken')

const SECRET_KEY = 'coderSecret'

exports.generateToken = (user) => {
const token = jwt.sign({ user }, SECRET_KEY, {expiresIn: '60s'})
return token
}

exports.authToken = (req, res, next) => {
    const authHeader = req.header.authorization
    if(!authHeader) return res.status(401).json({error: 'Not authenticated'})
    const token = authHeader.split(' ')[1]

    jwt.verify(token, SECRET_KEY, (error, credentials) => {
        if(error) return res.status(403).json({error: 'Not authorized'})

        req.user = credentials.user

        next()
    })
}


