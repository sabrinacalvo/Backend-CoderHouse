const UserDTO = require('../DTOs/User.dto')

class UserRepository {
    constructor(dao){
      this.UserDAO = dao
    }

    async getAll(){
        try {
          return await this.UserDAO.getAll()   
        } catch (error) {
          throw error

        }

    }

    async create(user) {
        try {
           const newUserInfo = new UserDTO(user)
           return await this.UserDAO.create(newUserInfo)
        } catch (error) {

        }
    }
}
module.exports = UserRepository