import { fetchData } from "./modules/fetchWrapper.js";

let featuredProducts = []; 

document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedProducts()
  });

async function loadFeaturedProducts() {
  try {
    const data = await fetchData("data/catalog.json");

    const productsArray = data.products;

    featuredProducts = productsArray.slice(1, 7);
    
    renderCarousel(featuredProducts);
    renderFeaturedProducts(featuredProducts);

  } catch (error) {
    console.error('Failed to load featured products:', error);
  }
}

function renderCarousel() {
  const carouselInner = document.getElementById("carouselInner");
  carouselInner.innerHTML = "";

  featuredProducts.forEach((product, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (index === 0) {
      carouselItem.classList.add("active");
    }

    const img = document.createElement("img");
    img.src = product.thumbnailImage;
    img.alt = product.itemTitle;
    img.classList.add("d-block", "w-100");

    const caption = document.createElement("div");
    caption.classList.add("carousel-caption", "bg-dark", "bg-opacity-50");

    const title = document.createElement("h5");
    title.textContent = product.itemTitle;

    const description = document.createElement("p");
    description.textContent = product.description;

    caption.appendChild(title);
    caption.appendChild(description);

    carouselItem.appendChild(img);
    carouselItem.appendChild(caption);

    carouselInner.appendChild(carouselItem);
  });
}

function renderFeaturedProducts() {
  const container = document.getElementById("featuredProductsContainer");
  container.innerHTML = "";

  featuredProducts.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-sm-6 mb-4";

    const card = document.createElement("div");
    card.className = "card h-100";

    const img = document.createElement("img");
    img.src = product.thumbnailImage;
    img.alt = product.itemTitle;
    img.className = "card-img-top";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = product.itemTitle;

    const description = document.createElement("p");
    description.className = "card-text";
    description.textContent = product.description;

    const detailsButton = document.createElement("button");
        detailsButton.classList.add("btn", "btn-primary");
        detailsButton.textContent = "View Details";
        detailsButton.addEventListener("click", () => {
                sessionStorage.setItem("selectedProductId", product.itemId);
            window.location.href = "productDetails.html";
        });
    
    cardBody.appendChild(title);
    cardBody.appendChild(description);
    cardBody.appendChild(detailsButton);

    card.appendChild(img);
    card.appendChild(cardBody);

    col.appendChild(card);

    container.appendChild(col);
  });
}


