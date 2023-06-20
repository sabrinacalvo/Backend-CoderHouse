const Users = require("../models/user.model");
const CustomError = require("../../utils/errors/Custom.error");
const { isValidPassword } = require("../../utils/cryptPassword");
const { generateToken } = require("../../utils/jwt.utils")

class AuthDb{
    async login(body){

        const { email, password } = body;
        if(!email || !password) return {status: 'failed', message: 'Email or passw invalid'};
      
        const user = await Users.findOne({ email });
        if(!user) return {status: 'failed', message: 'User not exist'};

        if (!isValidPassword(user, password)) return {status: 'failed', message: 'Invalid Password'};
      
        user.lastlogin = new Date()
        await user.save()
       
        const currentUser = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            cart: user.cart,
            role: user.role
        }

        const token = generateToken(currentUser);
        if (!token) console.log("Token for user logging  was not created")
        
        return {status: 'success', message: 'User succesfully logged', payload: token};
    }
}

module.exports = AuthDb;