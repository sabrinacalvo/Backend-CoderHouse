const mongoose = require('mongoose')
const UsersDao = require('../src/dao/models/user.model')
const Assert = require('assert')


mongoose.connect(
    'mongodb+srv://admin:tbMJI5k27RWXs5jO@ecommerce.nrktv74.mongodb.net/Data?retryWrites=true&w=majority'
)

const assert = Assert.strict

describe('Testear Dao de Usuarios', ()=>{
    before( function(){
        this.Users = new UsersDao()
    })

    it('El Dao debe poder obtener los usuarios en formato de arreglo', async function () {
        const result =  await this.Users.get()
        assert.strictEqual(Array.isArray(result), true)
    })
})