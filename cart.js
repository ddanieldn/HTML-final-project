// Function to retrieve cart data from localStorage and display it
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalItemsElement = document.getElementById('totalItems');
    const totalPriceElement = document.getElementById('totalPrice');

    let totalItems = 0;
    let totalPrice = 0;

    cartItemsContainer.innerHTML = ''; // Clear any existing cart items

    cart.forEach((item, index) => {
        totalItems += item.quantity;
        totalPrice += item.quantity * item.price;

        // Create a div for each item in the cart
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <p> ${item.size}</p>
            <p>Quantity: 
                <button class="decrease-qty" data-index="${index}">-</button>
                ${item.quantity}
                <button class="increase-qty" data-index="${index}">+</button>
            </p>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;

        cartItemsContainer.appendChild(itemDiv);
    });

    // Update the total items and price
    totalItemsElement.textContent = totalItems;
    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Add event listeners to the increase, decrease, and remove buttons
    const increaseButtons = document.querySelectorAll('.increase-qty');
    const decreaseButtons = document.querySelectorAll('.decrease-qty');
    const removeButtons = document.querySelectorAll('.remove-item');

    increaseButtons.forEach(button => button.addEventListener('click', increaseQuantity));
    decreaseButtons.forEach(button => button.addEventListener('click', decreaseQuantity));
    removeButtons.forEach(button => button.addEventListener('click', removeItem));
}

// Function to increase the quantity of an item
function increaseQuantity() {
    const index = this.getAttribute('data-index');
    let cart = JSON.parse(localStorage.getItem('cart'));

    cart[index].quantity += 1; // Increase quantity by 1

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload the cart
}

// Function to decrease the quantity of an item
function decreaseQuantity() {
    const index = this.getAttribute('data-index');
    let cart = JSON.parse(localStorage.getItem('cart'));

    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Decrease quantity by 1
    } else {
        cart.splice(index, 1); // Remove item if quantity is 1
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload the cart
}

// Function to remove an item from the cart
function removeItem() {
    const index = this.getAttribute('data-index');
    let cart = JSON.parse(localStorage.getItem('cart'));

    cart.splice(index, 1); // Remove item from cart

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); // Reload the cart
}

// Function to clear the cart after checkout (if needed)
document.getElementById('checkoutButton').addEventListener('click', function () {
    alert('Proceeding to checkout...');

    // Optionally clear the cart after checkout
    localStorage.removeItem('cart');
    loadCart(); // Reload the cart to reflect the empty cart
});

// Load the cart when the page loads
window.onload = loadCart;
