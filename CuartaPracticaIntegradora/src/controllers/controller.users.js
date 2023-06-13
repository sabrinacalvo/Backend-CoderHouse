const { Router } = require('express')
const passport = require('passport')
const { UserDAO } = require('../dao/factory.js')
const { createHash } = require('../utils/cryptPassword')
const usersService = require('../repositories/index')
const UserDTO = require('../DTOs/User.dto')
const CustomError = require('../utils/errors/Custom.error')
const {generateUserErrorInfo} = require('../utils/errors/info.error')
const EnumError = require('../utils/errors/enums.error')

const router = Router()

const users1 = UserDAO;

router.post('/register', async (req,res) => {
  const { first_name, last_name, email, password } = req.body;

    // Check user details
    if(!first_name || !last_name || !email || !password)
      return res.status(400).json({status: 'error', message: 'User details error'});
    
    const newUserInfo = {
      first_name,
      last_name,
      email,
      password};

    try {
        const response = await users1.registerUser(newUserInfo);
        if(response.status === 'failed') return res.status(400).json({status: response.status, message: response.message, payload: {}});
          res.status(201).json({status: 'success', message: response.message, payload: response.payload});
    } catch(error) {
        //req.logger.error(error); Revisar colorize
        if(error.code === 11000) return res.status(400).json({status: 'error', error: 'User already exists'});
        else {
          res.status(500).json({status: 'error', error: error.message }); 
        }
    }
})

router.get('/', async (req, res) => {
  try {
    const allUsers = await users1.getAll();
    res.status(200).json({message: 'Getting all users...', allUsers})
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

router.post('/auth', async(req,res) => {

})

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


// router.post('/auth', passport.authenticate('register', { failureRedirect: '/failRegister'}),
//  async (req, res) => {

//    try { 
// //    const { first_name, last_name, age, email, password } = req.body
        
// //  // consulta a la base de datos  
// // //    const userExist = await User.findOne({email})
// // //    if(userExist) return
// //    const newUserInfo = {
// //         first_name,
// //         last_name,
// //         age,
// //         email,
// //         password: createHash(password)
// //     } 
// //      const newUser = await User.create(newUserInfo)

//      res.json({ message: 'Usuario registrado' })
//   } catch (error) {
//         console.log(error)
//          if (error.code === 11000) return res.status(400).json({ error: 'El usuario ya existe' })
//          res.status(500).json({ error: 'Error interno del servidor' })
//        }
//  })

//  router.get('/failRegister', async (req, res) => {
//   console.log('Falló el registro');
//   res.json({ error: 'Falló' });
// });


module.exports = router