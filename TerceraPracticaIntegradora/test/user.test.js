const mongoose = require('mongoose')
const UsersDao = require('../src/dao/dbManagers/user.dbManager')
const Assert = require('assert')
// const ProductDbManager = require('../src/dao/dbManagers/products.dbManager')


mongoose.connect(
    'mongodb+srv://admin:tbMJI5k27RWXs5jO@ecommerce.nrktv74.mongodb.net/Data?retryWrites=true&w=majority'
)

const assert = Assert.strict

describe('Testear Dao de Usuarios', ()=> {
     const mockUser = {
         first_name: "Sabrina",
         last_name: "Calvo",
         email: "sabrinas@gmail.com",
         password: "hola123",
     }

    before(function () {
        this.Users = new UsersDao()
    })

    beforeEach(async function () {
        this.timeout(5000)
        await mongoose.connection.collections.users.deleteMany({})
      })

     it('El Dao debe poder obtener los usuarios en formato de arreglo', async function () {
         const result =  await this.Users.getAll()
         assert.strictEqual(Array.isArray(result), true)
     })


     it('el DAO debe agregar correctamente un elemento a la base de datos', async function(){
        
         const result = await this.Users.registerUser(mockUser)
         assert.ok(result._id)
     })

     it('El DAO agregará al documento insertado un arreglo de producto vacío por defecto', async function () {
         const result = await this.Users.save(mockUser)
    
    //  assert.deepStrictEqual(result.ProductDbManager, [])
    })
    
    it('El DAO puede obtener a un usuario por email', async function () {
        const result = await this.Users.save(mockUser)
       
        const user = await this.Users.findUserByEmail(result.email)
         assert.strictEqual(typeof user, 'object')
       })
    })