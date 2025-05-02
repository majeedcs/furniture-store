

//wait for doc
document.addEventListener("DOMContentLoaded", init);

function init() {
    const accConfirmBtn = document.getElementById("account-confirm-btn");
    accountSignIn();
    const forgotPasswordContinue = document.getElementById("forgot-password-continue-btn");
    // fetchCatalog();
    // forgotPasswordContinue.addEventListener('click', continueForgotPassword);

    const page = document.querySelector("[data-page]").dataset.page;
    if(page === "catalog") {
        fetchCatalog();
    }
    // switch (page) {
    //     case "home":
    //         HomeUtils.initHome();
    //         break;
    //     case "cart":
    //         break;
    //     case "account":
    //         break;
    //     case "about":
    //         break;
    //     case "contact":
    //         break;
    //     case "product":
    //         break;
    //     default:
    //         break;
    // }
}

async function fetchCatalog() { 
    try {
        const resourceUri = './data/catalog.json';
        const catalog = await fetchData(resourceUri);
        console.log(catalog);
        parseCatalog(catalog.products);
    } catch(error) {
        console.log(`Error while fetchcing the catalog: ${error.message}`);
    }
}

async function fetchData(resourceUri) {
    try {
        const response = await fetch(resourceUri);
        if (!response.ok) {
            throw new Error(`Response status was no bueno ${response.status}`);
        }

        const data = await response.json();
        //console.log(data);
        return data;
    } catch(error) {
        throw error;
    }
}

function parseCatalog(catalog) {
    const articleContainer = document.getElementById('catalog-article-container');
    console.log(catalog);
    catalog.forEach(product => {
        console.log(product);
        const article = createCustomElement(articleContainer, 'article', );
        const div = createCustomElement(article, 'div', product.name);
        const img = document.createElement('img');
        img.src = product.thumbnailImage;
        div.appendChild(img);
        div.addEventListener('click', (event) => 
        {
            console.log('Product was clicked...');
            console.log(event.target);
            const productDesc = JSON.stringify(product);
            localStorage.setItem('selected-product', productDesc);
            // const showId = colName.getAttribute("data-show-id");
            // localStorage.setItem('showId', showId);
            window.location = "product.html";
        });
    });
}

function createCustomElement(parent, newElemName, content) {
    const newElem = document.createElement(newElemName);
    newElem.textContent = content;
    parent.appendChild(newElem);
    return newElem;
}

function accountSignIn() {
    console.log();
}

function continueForgotPassword() {
    window.location.href = "forgotPassword2.html";
}


function displayCartProduct() {

}