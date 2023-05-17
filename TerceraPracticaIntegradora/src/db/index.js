const mongoose = require('mongoose')

const mongoConect = async () => {
    try {
      await mongoose.connect(
        'mongodb+srv://admin:tbMJI5k27RWXs5jO@ecommerce.nrktv74.mongodb.net/40305-sessions?retryWrites=true&w=majority'
        )
        console.log('db is connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = mongoConect