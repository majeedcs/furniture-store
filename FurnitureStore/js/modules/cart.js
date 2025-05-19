document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    console.log("cart page initializing");
    
    document.getElementById('clear-cart-btn').addEventListener('click', () => {
        localStorage.removeItem('cart');
        renderCart();
    });
});

export function getCart() {
    const cartJSON = localStorage.getItem('cart');
    return cartJSON ? JSON.parse(cartJSON) : [];
}

export function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(product) {
    const cart = getCart();

    // Check if product already in cart
    const index = cart.findIndex(item => item.itemTitle === product.itemTitle);
    if (index !== -1) {
        // If product exists, increase quantity
        cart[index].quantity += 1;
    } else {
        // Otherwise add new product with quantity 1
        const productToAdd = {
            ...product,
            quantity: 1
        };
        cart.push(productToAdd);
    }

    saveCart(cart);
}

// cart.js
export function renderCart() {
    const cartContainer = document.getElementById('cart-container');
    const emptyMessage = document.getElementById('empty-cart-message');
    const cart = getCart();

    cartContainer.innerHTML = ''; // Clear previous content

    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
        return;
    } else {
        emptyMessage.style.display = 'none';
    }

    cart.forEach((item, index) => {
        // Create a list group item with Bootstrap
        const listItem = document.createElement('div');
        listItem.classList.add('list-group-item', 'd-flex', 'align-items-center', 'gap-3', 'flex-wrap');

        // Product Image (small thumbnail)
        const img = document.createElement('img');
        img.src = item.thumbnailImage;
        img.alt = item.itemTitle;
        img.style.width = '80px';
        img.style.height = '80px';
        img.style.objectFit = 'cover';
        img.classList.add('flex-shrink-0');

        // Product details container
        const details = document.createElement('div');
        details.classList.add('flex-grow-1', 'me-3');

        const title = document.createElement('h5');
        title.textContent = item.itemTitle;

        const price = document.createElement('p');
        price.classList.add('mb-1');
        price.textContent = `Price: $${item.unitPrice}`;

        const subtotal = document.createElement('p');
        subtotal.classList.add('mb-1');
        subtotal.textContent = `Subtotal: $${(item.unitPrice * item.quantity).toFixed(2)}`;

        details.appendChild(title);
        details.appendChild(price);
        details.appendChild(subtotal);

        // Quantity controls container
        const quantityControls = document.createElement('div');
        quantityControls.classList.add('d-flex', 'align-items-center', 'gap-2');

        // Decrease quantity button
        const decBtn = document.createElement('button');
        decBtn.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
        decBtn.textContent = '−';
        decBtn.title = 'Decrease quantity';
        decBtn.addEventListener('click', () => {
            if (item.quantity > 1) {
                item.quantity--;
                saveCart(cart);
                renderCart();
            }
        });

        // Quantity display
        const quantityDisplay = document.createElement('span');
        quantityDisplay.textContent = item.quantity;
        quantityDisplay.classList.add('px-2');

        // Increase quantity button
        const incBtn = document.createElement('button');
        incBtn.classList.add('btn', 'btn-outline-secondary', 'btn-sm');
        incBtn.textContent = '+';
        incBtn.title = 'Increase quantity';
        incBtn.addEventListener('click', () => {
            item.quantity++;
            saveCart(cart);
            renderCart();
        });

        quantityControls.appendChild(decBtn);
        quantityControls.appendChild(quantityDisplay);
        quantityControls.appendChild(incBtn);

        // Remove item button
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-auto');
        removeBtn.textContent = 'Remove';
        removeBtn.title = 'Remove item from cart';
        removeBtn.addEventListener('click', () => {
            cart.splice(index, 1);
            saveCart(cart);
            renderCart();
        });

        // Append all to list item
        listItem.appendChild(img);
        listItem.appendChild(details);
        listItem.appendChild(quantityControls);
        listItem.appendChild(removeBtn);

        cartContainer.appendChild(listItem);
    });
}


function updateQuantity(index, quantity) {
    const cart = getCart();
    cart[index].quantity = quantity;
    saveCart(cart);
    renderCart();
}

function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

function clearCart() {
    localStorage.removeItem('cart');
    renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
    renderCart();

    const clearBtn = document.getElementById('clear-cart-btn');
    clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            clearCart();
        }
    });
});
