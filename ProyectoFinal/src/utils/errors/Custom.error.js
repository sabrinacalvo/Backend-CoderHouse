class CustomError {

  constructor({name = 'Error', cause, message, code}) {
      const error = new Error(message);
      error.cause = cause || 'Unkown cause issue';
      error.name = name;
      error.code = code || 500;
  
      throw error;
    }
  }
  
module.exports = CustomError