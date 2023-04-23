const { Router } = require('express')
const passport = require('passport')
// const User = require('../dao/models/user.model')
const { createHash } = require('../utils/cryptPassword')
const UserDTO = require('../DTOs/User.dto')
const usersService = require('../repositories')
const router = Router()


router.post('/', passport.authenticate('register', { failureRedirect: '/failRegister'}),
 async (req, res) => {

   try { 
    const user = req.body
    // const newUserInfo = new UserDTO(user)
    const newUser = await usersService.create(user)

     res.json({ message: 'Usuario registrado' })
    }    catch (error) {
        console.log(error)
         if (error.code === 11000) return res.status(400).json({ error: 'El usuario ya existe' })
         res.status(500).json({ error: 'Error interno del servidor' })
       }
 })

 router.get('/failRegister', async (req, res) => {
  try {
    const users = await usersService.getAll()
    console.log('Falló el registro');
    res.json({ error: 'Falló', message: users });

  } catch (error) {
    res.json({error: 'error', error})
  }
  
});


module.exports = router