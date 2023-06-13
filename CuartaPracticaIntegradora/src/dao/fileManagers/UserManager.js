const fs = require('fs');

const usersFileName = "users.json"

class FileUserManager {
  constructor() {
    this.name = '',
    this.lastName = '',
    this.fullName = this.name + this.lastName,
    this.id = ''
  }

  getUsers = async() => {
    let userfile = (`${this.path}${usersFileName}`);
    if (fs.existsSync(userfile)) {
        const objects = await JSON.parse(fs.readFileSync(userfile, "utf-8"));
        return objects;
    } else { 
        console.log("No se encontró el archivo", userfile);
        return [];
    }
    };

  getUserById = async (usid) => {
    let userfile = (`${this.path}${usersFileName}`);
    if (fs.existsSync(userfile)) {
      let usersArray = await JSON.parse(fs.readFileSync(userfile, "utf-8"));
      let user = usersArray.find((element) => element.id == usid);

      return (user == undefined ? "No hay un user con ese ID" : usid); 
    } else {
      return false;
    }
    };

}

module.exports = FileUserManager