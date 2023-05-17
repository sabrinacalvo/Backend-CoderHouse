class UserDTO {
    constructor(user) {
      this.name = user.first_name
      this.lastname = user.last_name
      this.active = true
      this.phone = user.phone ? user.phone.split('-').join('') : ''
      this.email = user.email
      this.password = user.password
    }
  }
  
  module.exports = UserDTO