const Users = require("../models/user.model.js");

class UserManager {
    constructor(){
        
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

    switchRole = async (id) => {
        const user = await Users.findById(id);
        if(!user) throw new CustomError({ status: 404, ok: false, response: "User not found in DB." });
        const update = {...user._doc, role: user._doc.role === "user" ? "premium" : "user" };
        await Users.updateOne({ _id: id }, update);
        return update;
    }

};

module.exports = UserManager;