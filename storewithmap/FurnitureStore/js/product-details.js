import { addToCart } from './modules/cart.js';
import { fetchData } from './modules/fetchWrapper.js';

document.addEventListener("DOMContentLoaded", initProductDetails);

async function initProductDetails() {
    console.log("Product details page initializing...");

    const product = await getSelectedProduct();
    if (!product) return;

    displayProductDetails(product);
    const addToCartBtn = document.getElementById("addToCartButton");
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", () => {
            const product = getSelectedProduct();
            if (product) {
                addToCart(product);
                alert(`${product.itemTitle} added to cart!`);
            }
        });
    }

    const backToCatalogBtn = document.getElementById("backToCatalogBtn");
    if (backToCatalogBtn) {
        backToCatalogBtn.addEventListener("click", () => {
            window.location.href = "catalog.html";
        });
    }

    const goToCartBtn = document.getElementById("goToCartBtn");
    if (goToCartBtn) {
        goToCartBtn.addEventListener("click", () => {
            window.location.href = "cart.html";
        });
    }
}

async function getSelectedProduct() {
    const productId = sessionStorage.getItem("selectedProductId");
    if (!productId) {
        console.error("No product ID found in sessionStorage.");
        return null;
    }

    try {
        const data = await fetchData("data/catalog.json");
        return data.products.find(p => p.itemId == productId);
    } catch (error) {
        console.error("Failed to fetch product data:", error);
        return null;
    }
}

function displayProductDetails(product) {
    const productTitle = document.getElementById("productTitle");
    const productImage = document.getElementById("productImage");
    const productPrice = document.getElementById("productPrice");
    const productDescription = document.getElementById("productDescription");

    if (productTitle) productTitle.textContent = product.itemTitle;
    if (productImage) {
        productImage.src = product.thumbnailImage;
        productImage.alt = product.itemTitle;
    }
    if (productPrice) productPrice.textContent = `$${product.unitPrice}`;
    if (productDescription) productDescription.textContent = product.description;
}