import { fetchData } from './modules/fetchWrapper.js';
import { addToCart } from './modules/cart.js';

document.addEventListener("DOMContentLoaded", initCatalog);

function initCatalog() {
    console.log('Catalog page initializing...');
    fetchProducts();

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", searchProducts);
    }
}

async function fetchProducts() {
    try {
        const resourceURI = 'data/catalog.json';
        const data = await fetchData(resourceURI);
        parseProducts(data.products);
    } catch (error) {
        console.log(`An error occurred while fetching the products. ${error.message}`);
    }
}

function parseProducts(products) {
    const catalogContainer = document.getElementById("catalog-article-container");
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

        const productPrice = document.createElement("p");
        productPrice.classList.add("card-text");
        productPrice.textContent = `$${product.unitPrice}`;

        const productDescription = document.createElement("p");
        productDescription.classList.add("card-text");
        productDescription.textContent = product.description;

        const detailsButton = document.createElement("button");
        detailsButton.classList.add("btn", "btn-primary");
        detailsButton.textContent = "View Details";
        detailsButton.addEventListener("click", () => {
                sessionStorage.setItem("selectedProductId", product.itemId);
            window.location.href = "productDetails.html";
        });

        const addToCartButton = document.createElement("button");
        addToCartButton.classList.add("btn", "btn-success");
        addToCartButton.textContent = "Add to Cart";
        addToCartButton.addEventListener("click", () => {
            addToCart(product);
            alert(`${product.itemTitle} added to cart!`);
        });

        cardBody.appendChild(productName);
        cardBody.appendChild(productDescription);
        cardBody.appendChild(productPrice);
        cardBody.appendChild(detailsButton);
        cardBody.appendChild(addToCartButton);

        card.appendChild(img);
        card.appendChild(cardBody);
        productCard.appendChild(card);
        catalogContainer.appendChild(productCard);
    });
}

function searchProducts() {
    const filter = document.getElementById('searchInput').value.toLowerCase();
    const productCards = document.querySelectorAll('#catalog-article-container > .col');

    productCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        card.style.display = title.includes(filter) ? 'block' : 'none';
    });
}
