const { Router } = require('express')
const passport = require('passport')
const User = require('../dao/models/user.model')
const { createHash } = require('../utils/cryptPassword')

const { UserDAO } = require('../dao/factory')
const router = Router()


router.post('/', passport.authenticate('register', { failureRedirect: '/failRegister'}),
 async (req, res) => {

   try { 
//    const { first_name, last_name, age, email, password } = req.body
        
//  // consulta a la base de datos  
// //    const userExist = await UserDAO.findOne({email})
// //    if(userExist) return

//    const newUserInfo = {
//         first_name,
//         last_name,
//         age,
//         email,
//         password: createHash(password)
//     }
        
//      const newUser = await User.create(newUserInfo)

     res.json({ message: 'Usuario registrado' })
  } catch (error) {
        console.log(error)
         if (error.code === 11000) return res.status(400).json({ error: 'El usuario ya existe' })
         res.status(500).json({ error: 'Error interno del servidor' })
       }
 })

 router.get('/failRegister', async (req, res) => {
  console.log('Falló el registro');
  res.json({ error: 'Falló' });
});


module.exports = router