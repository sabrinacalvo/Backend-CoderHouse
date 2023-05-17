const config = require('../config/index')


const {environment} = config.app

switch (environment) {
    case 'development':
        console.log('devLog')
        module.exports = require('./dev.logger')
    break;
    
    case 'production':
        console.log('prodLog')
        module.exports = require('./prod.logger')
        break;
}