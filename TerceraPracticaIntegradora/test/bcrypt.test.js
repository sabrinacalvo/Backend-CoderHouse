 const chai = require ('chai')
 const { createHash, isValidPassword } = require ('../src/utils/cryptPassword')

 const expect = chai.expect

 describe('Testear Dao de Usuarios', ()=> {
    const mockUser = {
        first_name: "Sabrina",
        last_name: "Calvo",
        email: "sabrinas@gmail.com",
        password: "hola123",
    }


  it('El servicio debe realizar un hasheo efectivo de la contraseña (debe corroborarse que el resultado sea diferente a la contraseña original', async function () {
     const result = await createHash(mockUser.password)

     expect(result).is.not.equal(mockUser.password)

     const regex =
       /(?=[A-Za-z0-9@#$%/^.,{}&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g
     expect(result).to.match(regex)
   })

   it('El hasheo realizado debe poder compararse de manera efectiva con la contraseña original (la comparación debe resultar en true)', async function () {
     const passwordHashed = await createHash(mockUser.password)

     const newMockUser = {
       first_name: 'sabrina',
       last_name: 'Calvo',
       email: 'sabrina@calvo.com',
       password: passwordHashed,
     }

     const result = await isValidPassword(newMockUser, mockUser.password)

     expect(result).is.equal(true)
   })

   it('Si la contraseña hasheada se altera, debe fallar en la comparación de la contraseña original.', async function () {
     const passwordHashed =
       '$2b$10$CyqdeKvO4OGuY3cUXtE/7eQ1MJBJzVcOSo1ERAV.51MjkqaCz6nNG'

     const result = await isValidPassword(
       { password: passwordHashed },
         mockUser.password
     )

     expect(result).is.equal(false)
   })
 })