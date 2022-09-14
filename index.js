const container = document.querySelector('.productsContainer');
const cart = document.querySelector('.carrito');
const cartIcon = document.querySelector('.cartIcon');
const search = document.querySelector('.search');

let products = [
    { name: "Queso", price: 400, cantidad: 0 },
    { name: "Papa", price: 470, cantidad: 0 },
    { name: "Leche", price: 690, cantidad: 0 },
    { name: "Nesquik", price: 230, cantidad: 0 },
    { name: "Yogur", price: 400, cantidad: 0 },
    { name: "Carne", price: 400, cantidad: 0 },
    { name: "Tofu", price: 400, cantidad: 0 },
    { name: "Chocolate", price: 400, cantidad: 0 },
    { name: "Medialunas", price: 400, cantidad: 0 }
]

document.addEventListener('DOMContentLoaded', () => {
    writeCartHTML();
    products.forEach(product => writeHTML(product));
})

cartIcon.addEventListener('click', () => {
    cart.classList.toggle('showCart')
})

search.addEventListener('input', (e) => {
    let value = e.target.value.toLowerCase();

    container.textContent = '';
    products.forEach(product => {
        if (product.name.toLowerCase().indexOf(value) !== -1) {
            writeHTML(product);
        }
    })
})

let cartProducts = [];

function writeHTML(product) {
    const div = document.createElement('div');
    const title = document.createElement('h3');
    const p = document.createElement('p');
    const btn = document.createElement('button');

    title.textContent = product.name;
    p.textContent = `Precio: $${product.price}`;
    btn.textContent = "Añadir al carrito"

    btn.onclick = () => addToCart(product)

    div.append(title);
    div.append(p);
    div.append(btn);

    container.append(div);
}


function writeCartHTML() {
    cart.textContent = '';
    cartProducts.forEach(product => {
        const div = document.createElement('div');
        const title = document.createElement('h3');
        const p = document.createElement('p');
        const cantidadText = document.createElement('p');
        const btn = document.createElement('button');

        title.textContent = product.name;
        p.textContent = `Precio: $${product.price * product.cantidad}`;
        cantidadText.textContent = `Cantidad: ${product.cantidad}`;
        btn.textContent = "X"

        btn.onclick = () => deleteProduct(product)

        div.append(title);
        div.append(p);
        div.append(cantidadText);
        div.append(btn);

        cart.append(div);
    })
    if (cartProducts.length == 0) {
        cart.textContent = "No hay productos en el carrito..."
    }
}

function addToCart(product) {
    product.cantidad++;
    if (product.cantidad == 1) {
        cartProducts.push(product);
    }
    writeCartHTML();
}
function deleteProduct(product) {
    if (product.cantidad > 1) {
        product.cantidad--;
    } else {
        product.cantidad = 0;
        cartProducts = cartProducts.filter(cartProduct => cartProduct.name != product.name)
    }
    writeCartHTML();
}