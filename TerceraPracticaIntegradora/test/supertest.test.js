const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect

const requester = supertest('http://localhost:8080')

describe('Testing FunkoStore', () => {
    describe('Products Test', ()=> {
        const productMock = {
            title: "Funko Pop bts",
            description: "Funko",
            price: "1999",
            stock: 20,
            category:"Funko"
             
         }

         it('El endpoint POST /api/products debe crear un producto correctamente', async () => {
            const {
                 statusCode,
                 created,
                 _body
             } = await requester
             .post('/api/products')
             .send(productMock)

            expect(statusCode).to.equal(201)
             expect(created).to.be.true
             expect(_body.payload).to.have.property('_id')
                              

         })
         it('al crear un producto solo con los datos elementales. Se sebe corroborar que producto cuente con la propiedad  title : not null', async () => {
            const { _body } = await requester.post('/api/products').send(productMock)
            expect(_body.payload).to.have.property('title').is.not.null
         })

         it('Si title es vacio, responde status 400', async () => {
            const productMock = {
               
                description: "Funko",
                price: "1999",
                stock: 20,
                category:"Funko"
             }
            const {statusCode } = await requester.post('/api/products').send(productMock) 
            expect(statusCode).to.equal(400)
         })
    })

describe('Users test', ()=> {

})    




})
