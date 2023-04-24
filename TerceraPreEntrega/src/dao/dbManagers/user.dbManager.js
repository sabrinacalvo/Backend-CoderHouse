const Users = require("../models/user.model.js");

class UserManager {
    constructor(){
        console.log('se creo el user')
    }
    async getAll() {
      try {
        return await  Users.find()
      } catch (error) {
        throw new Error(error)
      }
    }

    registerUser = async (newUserInfo) => {
        
        try {
            const newUser = await Users.create(newUserInfo);
            return newUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
     
    };

    findUserByEmail = async (emailToSeach) => {
        try {
            const user = await Users.findOne({email: emailToSeach});
            return user? user : {}
        } catch(error) {
            console.log(error);
            throw error;
        }
    };

    findUserById = async (idToSeach) => {
        try {
            const user = await Users.findById(idToSeach);
            return user? user : {};
        } catch(error) {
            console.log(error);
            throw error;
        }
    }

};

module.exports = UserManager;