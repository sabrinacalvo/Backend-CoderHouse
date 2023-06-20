const { Router} = require ('express')
const { registerUser, loginUser } = require ('../sessions.manager')

const router = Router();

router.post('/login', async (req, res) => {
      loginUser(req, res)

      res.send({ status: 'success', message: 'Logged'})
   
  
  })

router.post('/register', async (req, res) => {
  registerUser(req, res)

  res.send({ status: 'success', message: 'Registered'})

})

module.exports = router;