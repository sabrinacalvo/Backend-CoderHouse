const { Router } = require('express')
const config = require('../config')
const passport = require('passport')
const User = require('../dao/models/user.model')
const { isValidPassword, createHash } = require('../utils/cryptPassword')
const { generateToken, authToken, isValidToken } = require('../utils/jwt.utils')
const sendMail = require("../utils/email");

const {port} = config.app

const router = Router()

router.get('/', async (req, res) => {
  console.log('Auth')
  res.json({ message: 'auth' })
}

)

router.post(
  '/',
  passport.authenticate('login', { failureRedirect: '/failLogin' }),
   async (req, res) => {
    console.log(req.body)
   try {
      if (!req.user)
        return res.status(400).json({ error: 'Credenciales invalidas' });

      req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
      }

      res.json({ message: req.user });

     // Login autenticación

    //  const adminEmail = 'adminCoder@coder.com';
    //  let role = 'usuario'
    //  const { email, password } = req.body

    //  const user = await User.findOne({ email })
         

    //  if (!user) 
    //   return res
    //      .status(400)
    //      .json({ error: 'El usuario y la contraseña no coinciden' })
      
    //  const ValidatePassword = isValidPassword(user, password)
    //  if (!ValidatePassword)
    //   return res.status(400)
    //      .json({ error: 'El usuario y la contraseña no coinciden' })
     
    //  if(email === adminEmail) role = 'administrador';
     

    //  req.session.user = {
    //    first_name: user.first_name,
    //    last_name: user.last_name,
    //    email: user.email,
    //    role
       
    //  }


    // const token = generateToken(email)

    //res.json({ message: 'Sesión Iniciada' })
    
   } catch (error) {
     res.status(500).json({ error: 'Internal Server Error' })
   }
 })

 router.get('/failLogin', (req, res) => {
  res.send({error: 'Failed Login'})
 })

 router.get('/github',
  passport.authenticate('github', { scope: ['user: email'] }),
  async (req, res) => {}
);

router.get('/githubcallback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);
router.get('/google',
  passport.authenticate('google', { scope: ['profile'] }),
  async (req, res) => {}
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

 router.get('/logout', (req, res) => {
   req.session.destroy(error => {
     if (error) return res.json({ error })
     res.redirect('/login')
   })
})

router.get('/github', passport.authenticate('gitbu'))

router.patch('/forgotPassword', async (req, res) => {
  try {
    const { email, password } = req.body;

    const passwordEncrypted = createHash(password);
    await User.updateOne({ email }, { password: passwordEncrypted });

    res.json({ message: 'Contraseña actualizada' });
  } catch (error) {}
});


router.post('/restorePassword', async (req, res, next) => {
  const { email } = req.body;

  if(!email) return res.status(400).json({ status: 400, ok: false, response: "Invalid request." });

  const token = generateToken(email);

  try {
      const aux = await sendMail(
        email,
          "Restore password",
          `
          <div>
              Link to reset your password <a href="https://localhost:${port}/auth/restorePassword/${token}" target="_blank">this link</a> <br/>
              Remember that you only have 60 min before token expires.<br/>
              Do not reply this email.
          </div>
          `
      )
       
      return res.status(200).json({ status: 200, ok: false, response: "Email sent" });
     }catch(error){
       next(error)
  }
})

router.post("/restorePassword/:token", authToken, async (req, res, next) => {
  const { password } = req.body;    
  const { token } = req.params;

  if(!password) return res.status(400).json({ status: 400, ok: false, response: "Invalid request." });

  if(isValidPassword(req.user, password)) return res.status(400).json({ status: 400, ok: false, response: "Password can't be equal to current password."});

  try{
      if(!isValidToken(token)) return res.status(400).json({ status: 400, ok: false, response: "Invalid token." });
        res.status(200).json({ status: 200, ok: true, response: token });
  }catch(error){
      next(error)
  }
})

module.exports = router