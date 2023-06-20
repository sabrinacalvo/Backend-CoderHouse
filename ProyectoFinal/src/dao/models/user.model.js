const mongoose = require('mongoose')

const userCollection = 'user'
const userTypes = ['user', 'premium', 'admin'];

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  active: { 
    type: Boolean,
    default: true
  },
  phone: String,
  age: Number,
  email: {
    type: String,
    unique: true
  },
  cart: String,
  password: String,
  lastLogin: Date,
  role: {
    type: String,
    enum: userTypes,
    default: 'admin',
  },
  
})

const User = mongoose.model(userCollection, userSchema)

module.exports = User