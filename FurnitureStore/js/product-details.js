document.addEventListener("DOMContentLoaded", () => {
    const productData = localStorage.getItem("selectedProduct");

    if (!productData) {
        document.getElementById("product-details").innerHTML = `
            <div class="alert alert-warning">
                No product data found. Please go back and select a product from the catalog.
            </div>
        `;
        return;
    }

    const product = JSON.parse(productData);
    renderProductDetails(product);
});

function renderProductDetails(product) {
    const container = document.getElementById("product-details");

    container.innerHTML = `
        <div class="row">
            <div class="col-md-5">
                <img src="${product.thumbnailImage}" alt="${product.itemTitle}" class="img-fluid rounded">
            </div>
            <div class="col-md-7">
                <h2>${product.itemTitle}</h2>
                <p class="text-muted">$${product.unitPrice}</p>
                <p>${product.description}</p>
            </div>
        </div>
    `;
}
