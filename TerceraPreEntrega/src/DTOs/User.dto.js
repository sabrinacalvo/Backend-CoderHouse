class UserDTO {
    constructor(user) {
      this.name = user.first_name
      this.lastname = user.last_name
      this.active = true
      this.phone = user.phone ? user.phone.split('-').join('') : ''
    }
  }
  
  module.exports = UserDTO