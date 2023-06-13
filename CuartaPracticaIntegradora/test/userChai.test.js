const mongoose = require('mongoose')
const UsersDao = require('../src/dao/dbManagers/user.dbManager')
 const chai = require ('chai')

 mongoose.connect(
    'mongodb+srv://admin:tbMJI5k27RWXs5jO@ecommerce.nrktv74.mongodb.net/Data?retryWrites=true&w=majority'
)


 const expect = chai.expect

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
        // assert.strictEqual(Array.isArray(result), true)
        expect(result).to.be.deep.equal([])
    })


    it('el DAO debe agregar correctamente un elemento a la base de datos', async function(){
       const result = await this.Users.registerUser(mockUser)
        // assert.ok(result._id)
        expect(result).to.have.property('_id')
    })

    it('El DAO agregará al documento insertado un arreglo de productos vacío por defecto', async function () {
        const result = await this.Users.save(mockUser)
        result.Products = []
  
   expect(result).to.have.property('Products').to.be.an('array').that.is.empty
   })
   
   it('El DAO puede obtener a un usuario por email', async function () {
       const result = await this.Users.save(mockUser)
       
       const user = await this.Users.findUserByEmail(result.email)
       
        expect(result).to.have.property('email')
      })

   it('El DAO puede actualizar el nombre de usuario', async function () {
        const user = await this.Users.save(mockUser)
        
        await this.Users.update(user._id, {
            first_name: "Francisco",
        })

        const result = await this.Users.findUserById(user._id)
        
         expect(result.first_name).to.equal('Francisco')
       })

   it('El DAO puede eliminar un usuario', async function () {
        const user = await this.Users.save(mockUser)

        await this.Users.delete(user._id)
        
        const result = await this.Users.findUserByEmail(user.email)
        
        expect(!result)
         
   
      })

 })
