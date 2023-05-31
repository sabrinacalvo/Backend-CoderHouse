const UsersRepository = require("./Users.repository");
const { UserDAO } = require('../dao/factory')

const usersService = new UsersRepository(UserDAO)


module.exports = usersService