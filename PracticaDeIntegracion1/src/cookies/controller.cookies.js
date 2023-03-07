const { Router } = require('express')

const router = Router()


// router.get('/view', (req, res) => {
//     res.render('cookies.handlebars')
//   })
  

  // router.get('/cookies', (req, res) => {
  //   const cookies = req.cookies
  
  //   res.send(cookies)
  // })

  router.post('/', (req, res) => {
    const user = req.body
  
    res.cookie('userInfo', JSON.stringify(user), { maxAge: 10000 }).json({ message: 'Cookie creada' })
  })


function auth(req, res, next) {
    if(!req.session.admin) {
        return  res.json({ error: 'N tienes permisos'})
    }
    next()
}


module.exports = router