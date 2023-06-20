const { Router } = require('express')
// const passport = require('passport')
const { UserDAO } = require('../dao/factory.js')
const { createHash } = require('../utils/cryptPassword')
const usersService = require('../repositories/index')
const UserDTO = require('../DTOs/User.dto')
// const CustomError = require('../utils/errors/Custom.error')
// const {generateUserErrorInfo} = require('../utils/errors/info.error')
const EnumError = require('../utils/errors/enums.error')
const { faker } = require('@faker-js/faker')

const router = Router()

const users1 = UserDAO;

router.get('/test',(req,res)=>{
  let first_name = faker.name.firstName();
  let last_name = faker.name.lastName();
  let email = faker.internet.email();
  let password =  faker.internet.password();
  res.send({first_name,last_name,email,password})
})

router.post('/register', async (req,res) => {
  const { first_name, last_name, email, password } = req.body;
  
    // Check user details
    if(!first_name || !last_name || !email || !password)
      return res.status(400).json({status: 'error', message: 'User details error'});
    
    const newUserInfo = {
      first_name,
      last_name,
      email,
      password: await createHash(password),
      lastLogin: new Date
    };
   
    try {
        const response = await users1.registerUser(newUserInfo);
        const newUser = new UserDTO(response);
        console.log(response)
        if(response.status === 'failed') return res.status(400).json({status: response.status, message: response.message, payload: newUser});
          res.status(201).json({status: 'success', message: response.message, payload: newUser });
    } catch(error) {
        //req.logger.error(error); Revisar colorize
        if(error.code === 11000) 
          return res.status(400).json({status: 'error', error: 'User already exists'});
        else {
          res.status(500).json({status: 'error', error: error.message }); 
        }
    }
})

router.get('/', async (req, res) => {
  try {
    const response = await users1.getAll();

    const allusers = []
    for(var key in response){
       allusers.push(new UserDTO(response[key]))
    }
    
    res.status(200).json({message: 'Getting all users...', allusers })
  } catch (error) {
    console.error(error)
  }
});

router.get('/:id', async(req,res) => {
  try{
    const response = await users1.findUserById(req.params.id);
    res.status(200).json({ status: 'success', ok: true, response })
  }catch(error){
    throw(error);
}
});

router.delete('/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
      const response = await users1.delete(uid);
      if(response.status === 'error') res.status(404).json({status: response.status, message: response.message});

      res.json(response);
  } catch(error) {
      req.logger.error(error);
      res.status(500).json({status: 'error', error: error.message});
  }
});

router.delete('/', async (req, res) => {
  const { uid } = req.params;

  try {
      const response = await users1.deleteAll()
      if(response.status === 'error') res.status(404).json({status: response.status, message: response.message});

      res.json(response);
  } catch(error) {
      req.logger.error(error);
      res.status(500).json({status: 'error', error: error.message});
  }
});

router.get('/premium/:uid', async (req, res) => {
  const { uid } = req.params;

  if(!uid) return res.status(400).json({status: 'error', message: 'User Id not found / error'});
  try{
      const response = await users1.switchRole(uid);
      res.status(200).json({ status: 'success', ok: true, response })
  }catch(error){
      console.log(error)
      next(error);
  }
});

// For testing
router.get('/easy', (req, res) => {
  let suma = 0
  for (let i = 0; i < 1000000; i++) {
    suma += i;
  }
  res.json({ suma })
})
router.get('/hard', (req, res) => {
  let suma = 0
  for (let i = 0; i < 5e8; i++) {
    suma += i;
  }
  res.json({ suma })
})


module.exports = router