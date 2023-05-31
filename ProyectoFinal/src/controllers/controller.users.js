const { Router } = require('express')
const passport = require('passport')
const User = require('../dao/models/user.model')
const { createHash } = require('../utils/cryptPassword')
const usersService = require('../repositories/index')
const UserDTO = require('../DTOs/User.dto')
const CustomError = require('../utils/errors/Custom.error')
const {generateUserErrorInfo} = require('../utils/errors/info.error')
const EnumError = require('../utils/errors/enums.error')

const router = Router()
const users = []

router.get('/', async (req, res) => {
  try {
  if (Object.entries(req.query).length === 0)
  req.logger.warning('La request no trajo queries')

  res.json({message: 'Hi'})
  } catch (error) {
    console.error(error)
  }
})



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


//Manejo de Errores

router.post('/', async (req, res) => {
  const { first_name, last_name, age, email, password } = req.body;
  if(!first_name || !last_name || !age || !email || !password) {
      CustomError.createError({
          name: 'User creation error',
          cause: generateUserErrorInfo({first_name, last_name, age, email}),
          message: 'Error trying to create user',
          code: EnumError.INVALID_TYPES_ERROR,
      });
  };
  
  const newUserInfo = {
      first_name,
      last_name,
      age,
      email,
      
  };

  if (users.length === 0) {
    user.id = 1
  } else {
    user.id = users[users.length - 1].id + 1
  }

  users.push(user)

  res.json({ message: user })
})



// router.post('/', async (req, res) => {
//   try {
//     const user = req.body

//     const newUser = await usersService.create(user)

//     res.json({ status: 'success', message: newUser })
//   } catch (error) {
//     res.json({ status: 'error', error })
//   }
// })




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