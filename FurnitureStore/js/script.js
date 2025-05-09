document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
    console.log('The app is initializing...');

    fetchProducts();
    
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", searchProducts);
    }
}

async function fetchProducts() {
    try {
        console.log("Fetching products...");
        
        // Load the data from catalog.json
        const response = await fetch('data/catalog.json');
        const data = await response.json();

        console.log(data); // Log the full response to inspect it

        // Check if the response contains a 'products' property that is an array
        if (data && Array.isArray(data.products)) {
            parseProducts(data.products);
            // Store products for search functionality
            window.currentProducts = data.products;
        } else {
            console.log("Products data is not available or invalid:", data);
        }
    } catch (error) {
        console.log(`An error occurred while fetching the products: ${error.message}`);
    }
}

function parseProducts(products) {
    const catalogContainer = document.getElementById("catalog-article-container");

    // Clear any previous content in the catalog container
    catalogContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("col", "mb-4");
        productCard.dataset.productName = product.itemTitle.toLowerCase();
        productCard.dataset.productDescription = product.description.toLowerCase();

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = product.thumbnailImage;
        img.alt = product.itemTitle;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const productName = document.createElement("h5");
        productName.classList.add("card-title");
        productName.textContent = product.itemTitle;

        const productDescription = document.createElement("p");
        productDescription.classList.add("card-text");
        productDescription.textContent = `${product.description}`;

        const productPrice = document.createElement("p");
        productPrice.classList.add("card-text");
        productPrice.textContent = `$${product.unitPrice}`;

        const detailsButton = document.createElement("button");
        detailsButton.classList.add("btn", "btn-primary");
        detailsButton.textContent = "View Details";
        detailsButton.addEventListener("click", () => {
            localStorage.setItem("selectedProduct", JSON.stringify(product));
            window.location.href = "productDetails.html";
        });

        cardBody.appendChild(productName);
        cardBody.appendChild(productPrice);
        cardBody.appendChild(productDescription);
        cardBody.appendChild(detailsButton);

        card.appendChild(img);
        card.appendChild(cardBody);

        productCard.appendChild(card);
        catalogContainer.appendChild(productCard);
    });
}

function searchProducts() {
    // Get the input value
    const filter = document.getElementById('searchInput').value.toLowerCase();

    // Get all product cards
    const productCards = document.querySelectorAll('#catalog-article-container > .col');

    productCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        card.style.display = title.includes(filter) ? '' : 'none';
    });
}