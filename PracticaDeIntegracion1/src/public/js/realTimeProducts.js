const socket = io();

socket.on("products", (data) => {
  let productZone = document.getElementById("productsList");
  let products = "";
  data.forEach((product) => {
    products =
      products +
      `<div class="product">
        <div class="product-img">
            <img src="${product.thumbnails}" alt="${product.title}" style="border-radius:40px; width: 200px;"/>
        </div>
        <h2>TiTLE: ${product.title}</h2>
        <h2>PRICE: $${product.price}</h2>
        <p>${product.description}</p>
      </div>`;
  });

  productZone.innerHTML = products;
});