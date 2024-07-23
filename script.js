// Sample product data (can be fetched from an API in a real scenario)
const products = [
    { id: 1, name: 'Product 1', price: 10.00 },
    { id: 2, name: 'Product 2', price: 20.00 },
    { id: 3, name: 'Product 3', price: 15.00 },
    { id: 4, name: 'Product 4', price: 25.00 }
];

// Function to display products on the webpage
function displayProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
        `;
        productsContainer.appendChild(productElement);

        // Add event listener for Add to Cart button
        const addToCartButton = productElement.querySelector('.add-to-cart-btn');
        addToCartButton.addEventListener('click', addToCartClicked);
    });
}

// Function to handle adding a product to the cart
function addToCartClicked(event) {
    const productId = parseInt(event.target.getAttribute('data-id'));
    const productName = event.target.getAttribute('data-name');
    const productPrice = parseFloat(event.target.getAttribute('data-price'));

    addToCart(productId, productName, productPrice);
}

// Function to add item to cart and update total
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || { items: [], total: 0 };

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(item => item.id === id);
    if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity++;
    } else {
        cart.items.push({ id, name, price, quantity: 1 });
    }

    // Update total price
    cart.total += price;

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Refresh cart display
    displayCart(cart);
}

// Function to display cart items and total
function displayCart(cart) {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';
    
    cart.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
        cartItemsElement.appendChild(li);
    });

    const cartTotalElement = document.getElementById('cart-total');
    cartTotalElement.textContent = cart.total.toFixed(2);
}

// Function to initialize the webpage
function init() {
    displayProducts();

    // Check if there's a saved cart in localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        displayCart(savedCart);
    }
}

// Initialize the webpage
init();
