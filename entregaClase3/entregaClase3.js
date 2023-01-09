class ProductManager {
	constructor () {
		 this.products = [];
		 this.id = 0;
	 }
	 addProduct(title, description, price, thumnail, code, stock) {
	   if (
		title &&
		description &&
		price &&
		thumnail &&
		code &&
		stock != undefined
	   ) {
		const product = {
		  code,
		  title,
		  description,
		  thumnail,
		  stock,
		  price,
		  id: this.id,
		};
	
		if (this.products.find((product) => product.code === code)) {
		  console.log(
		   "Error al agregar el producto, el producto ya se encuentra en el arreglo"
		  );
		  return;
		} else {
		  this.id++;
		  this.products.push(product);
		  console.log("El producto fue agregado al arreglo correctamente");
		}
	   } else {
		console.log("Error al agregar producto: hubo paramentros sin completar");
		return;
	   }
	 }
	 
	
	getProducts() {
	   this.products.length > 0
		? this.products.forEach((products) => console.log(products))
		: console.log("No hay productos en el arreglo");
	 }
 
   getProductById(id) {
	this.products.find((product) => product.id === parseInt(id))
	 ? console.log(this.products.filter((product) => product.id === parseInt(id)))
	 : console.log("Producto no encontrado");
  }
 }
  let manager1 = new ProductManager();
 
	   manager1.addProduct(
		  "Funko Pop",
		  "Funko Pop Bts Dynamite",
		  "$19.000",
		  "img", 
		  "10",
		  "1234"
	   );
	   
	   manager1.addProduct(
		  "Funko Pop",
		  "Funko Pop bts Butter",
		  "$3.000",
		  "img", 
		  "5",
		  "12345"
	   );  
	   
 
	   manager1.addProduct("Auto");
	   manager1.getProducts();
	   manager1.getProductById(0);
	   manager1.getProductById(3);
 
	   console.log(manager1.getProducts());
	   console.log("id1", manager1.getProductById(1));
	   console.log("id2", manager1.getProductById(2));
	   
	  
 