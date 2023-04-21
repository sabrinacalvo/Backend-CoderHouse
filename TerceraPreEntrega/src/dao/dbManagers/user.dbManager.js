const User = require("../models/user.model.js");

class UserManager {

    registerUser = async (newUserInfo) => {
        try {
            const newUser = await User.create(newUserInfo);
            return newUser;
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    findUserByEmail = async (emailToSeach) => {
        try {
            const user = await User.findOne({email: emailToSeach});
            return user? user : {}
        } catch(error) {
            console.log(error);
            throw error;
        }
    };

    findUserById = async (idToSeach) => {
        try {
            const user = await User.findById(idToSeach);
            return user? user : {};
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
};

module.exports = UserManager;