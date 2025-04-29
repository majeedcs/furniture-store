

//wait for doc
document.addEventListener("DOMContentLoaded", init);

function init() {
    const accConfirmBtn = document.getElementById("account-confirm-btn");
    accountSignIn();
    const forgotPasswordContinue = document.getElementById("forgot-password-continue-btn");
    // forgotPasswordContinue.addEventListener('click', continueForgotPassword);

    fetchCatalog();

    // const page = document.querySelector("[data-page]").dataset.page;
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
        const resourceUri = 'https://furniture-api.fly.dev/v1/products';
        const catalog = await fetchData(resourceUri);
        console.log(catalog);
        parseCatalog(catalog);
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
    console.log(catalog);
    shows.forEach(product => {
        console.log(product);
    //     const article = createCustomElement(, 'tr', '');
    //     const colID = createCustomElement(tr, 'td', show.id);
    //     const colName = createCustomElement(tr, 'td', show.name);
    //     colName.setAttribute("data-show-id", show.id);
    //     colName.addEventListener('click', (event) => 
    //     {
    //         // console.log('Product was clicked...');
    //         // console.log(event.target);
    //         const strShow = JSON.stringify(show);
    //         localStorage.setItem('selected-show', strShow);
    //         // const showId = colName.getAttribute("data-show-id");
    //         // localStorage.setItem('showId', showId);
    //         window.location = "details.html";
    //     });
    //     const colType = createCustomElement(tr, 'td', show.type);
    //     const colLang = createCustomElement(tr, 'td', show.language);
    //     const colGenre = createCustomElement(tr, 'td', show.genres);
    //     const colStatus = createCustomElement(tr, 'td', show.status);
    //     const colPremiered = createCustomElement(tr, 'td', show.premiered);
    //     const colSite = createCustomElement(tr, 'td', '');
    //     const showLink = createCustomElement(colSite, 'a', 'Visit Site');
    //     showLink.href = show.officialSite;
    //     const colImage = createCustomElement(tr, 'td', '');
    //     const img = createCustomElement(colImage, 'img', )
    //     img.src = show.image.medium;
    //     img.width = 100;
    //     img.height = 100;
    });
}

function accountSignIn() {
    console.log();
}

function continueForgotPassword() {
    window.location.href = "forgotPassword2.html";
}


function displayCartProduct() {

}