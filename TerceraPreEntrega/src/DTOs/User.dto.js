class UserDTO {
    constructor(user) {
        this.name = user.first_name
        this.lastname = user.last_name
        this.active = true
        this.phone = user.phone ?  user.phone.split('-').json('') :''
    }
}

module.exports = UserDTO