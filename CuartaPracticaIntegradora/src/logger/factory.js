const config = require('../config/index')


const {environment} = config.app

switch (environment) {
    case 'development':
        console.log('DevLog is set')
        module.exports = require('./dev.logger')
    break;
    
    case 'production':
        console.log('ProdLog is set')
        module.exports = require('./prod.logger')
        break;
}