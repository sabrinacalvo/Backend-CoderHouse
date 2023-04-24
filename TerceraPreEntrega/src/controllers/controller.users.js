const { Router } = require('express')
const passport = require('passport')
const User = require('../dao/models/user.model')
const { createHash } = require('../utils/cryptPassword')
const usersService = require('../repositories/index')
const UserDTO = require('../DTOs/User.dto')

const router = Router()

router.get('/', async (req, res) => {
  try {
    const users = await usersService.getAll()
    console.log('hole users')

    res.json({ status: 'success', message: users })
  } catch (error) {
    res.json({ status: 'error', error })
  }
})


router.post('/', async (req, res) => {
  try {
    const user = req.body

    const newUser = await usersService.create(user)

    res.json({ status: 'success', message: newUser })
  } catch (error) {
    res.json({ status: 'error', error })
  }
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