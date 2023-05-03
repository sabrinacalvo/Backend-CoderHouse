const winston = require ('winston')
const CustomLevelsOptions = require('../utils/loggerCustomLevelOptions.utils')

const logger = winston.createLogger({
    levels: CustomLevelsOptions.levels,
    transports: [
      new winston.transports.Console({
         level: 'info',
         format: winston.format.combine(
          winston.format.colorize({colors: CustomLevelsOptions.colors}),
          winston.format.simple()
          )
       
        }),
      new winston.transports.File({ 
        filename: './logs/errors.log',
        level: 'error',
        format: winston.format.simple(),
      })
      

],
})

module.exports = logger