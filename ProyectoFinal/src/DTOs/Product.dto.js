class ProductDTO {
    constructor(product) {
        this.id = product._id,
        this.title = product.title,
        this.description = product.description,
        this.category = product.category,
        this.code = product.code,
        this.stock = product.stock,
        this.price = product.price,
        this.thumbnail = product.thumbnail
    }   
};

module.exports = ProductDTO