const winston = require('winston')

const CustomLevelsOptions = {
    levels: {
        fatal:0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,

    },
    colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white'
    }
}

module.exports = CustomLevelsOptions