const { Router } = require('express')
const config = require('../config')
const passport = require('passport')
// const User = require('../dao/models/user.model')
const { generateToken, authToken, isValidToken } = require('../utils/jwt.utils')
const sendMail = require("../utils/email");
const AuthDb = require('../dao/dbManagers/auth.dbManager')

const {port} = config.app
const router = Router()
const Auth = new AuthDb();


router.post('/login', async (req, res, next) => {
  try{
    const response = await Auth.login(req.body);

    if (response.status == 'failed') res.status(400).json({status: response.status, message: response.message})
    
    res.cookie('token', response.payload, {maxAge: 1800000, httpOnly: true}).json({status: 200, message: response.message});
    
  }catch(error){
    res.status(403).json({status: 'error', error: 'Forbidden / Invalid login'});
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

router.get('/github', passport.authenticate('github'))


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
              Link to reset your password <a href="http://localhost:${port}/newpassword/${token}" target="_blank">this link</a> <br/>
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

router.get("/restorePassword/:token", async (req, res, next) => {
  // const { password } = req.body;    
  const { token } = req.params;

  // if(!password) return res.status(400).json({ status: 400, ok: false, response: "Invalid request." });

  // if(isValidPassword(req.user, password)) return res.status(400).json({ status: 400, ok: false, response: "Password can't be equal to current password."});

  try{
      if(!isValidToken(token)) return res.status(400).json({ status: 400, ok: false, response: "Invalid token." });
        res.status(200).json({ status: 200, ok: true, response: token });
  }catch(error){
      next(error)
  }
})

module.exports = router