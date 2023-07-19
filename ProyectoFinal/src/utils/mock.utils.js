const {faker} = require ('@faker-js/faker')

faker.locale = 'es';
faker.seed(123);

const generateProduct = () => {
    
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
        pcode: 'prd' + faker.datatype.number({ min: 100, max: 1000 }),
        price: faker.commerce.price(5000, 45000, 0),
        thumbnail: [faker.image.imageUrl()],
        stock: faker.datatype.number({max: 50})
    }
}
module.exports = generateProduct
