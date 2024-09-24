

// Selección de elementos
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');
const rowProduct = document.querySelector('.row-product');
const productsList = document.querySelector('.container-items');
const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');
const btnComprar = document.getElementById('btn-comprar');
const linkComprar = document.getElementById('link-comprar');

// Lista de productos en el carrito
let allProducts = [];

// Mostrar/Ocultar carrito
btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

// Añadir productos al carrito
productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.closest('.item');
        const title = product.querySelector('h2').textContent;
        const priceText = product.querySelector('.price').textContent;
        const price = parseFloat(priceText.replace(/[$,]/g, '')); // Elimina el signo $ y las comas

        const existingProduct = allProducts.find(prod => prod.title === title);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            allProducts.push({
                title,
                price,
                quantity: 1
            });
        }

        showHTML();
    }
});

// Eliminar productos del carrito
rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.closest('.cart-product');
        const title = product.querySelector('.titulo-producto-carrito').textContent;

        allProducts = allProducts.filter(prod => prod.title !== title);

        showHTML();
    }
});

// Mostrar carrito en HTML
const showHTML = () => {
    if (allProducts.length === 0) {
        // Mostrar el mensaje cuando no hay productos
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
        linkComprar.classList.add('hidden'); // Ocultar el botón "Comprar"
    } else {
        // Ocultar el mensaje cuando hay productos
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
        linkComprar.classList.remove('hidden'); // Mostrar el botón "Comprar"
    }

    // Limpiar HTML antes de agregar nuevos productos
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">$${product.price.toFixed(2)}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        rowProduct.append(containerProduct);

        total += product.quantity * product.price;
        totalOfProducts += product.quantity;
    });

    // Actualizar los valores en el HTML
    valorTotal.innerText = `$${total.toFixed(2)}`; // Muestra el total con dos decimales
    countProducts.innerText = totalOfProducts;
}

// Evitar redirección si no hay productos
linkComprar.addEventListener('click', function(event) {
    if (allProducts.length === 0) {
        event.preventDefault();  // Evitar que se redirija si no hay productos
        alert('No hay productos en el carrito'); // Mostrar un mensaje
    }
});
