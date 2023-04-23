const UserRepository = require("./Users.repository");
const { UserDAO } = require('../dao/factory')

const usersService = new UserRepository(UserDAO)


module.exports = usersService