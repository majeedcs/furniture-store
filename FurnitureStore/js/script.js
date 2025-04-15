//wait for doc
document.addEventListener("DOMContentLoaded", init);

class cartProduct {
    constructor(img, name, inStock, price) {
        
    }
}

function init() {
    const accConfirmBtn = document.getElementById("account-confirm-btn");
    accountSignIn();
    const forgotPasswordContinue = document.getElementById("forgot-password-continue-btn");
    forgotPasswordContinue.addEventListener('click', continueForgotPassword);
    const setThemeSlider = document.getElementById("range-set-theme");
    
    //Set theme conditional
    setThemeSlider.addEventListener('input', function() {
        if(setThemeSlider.value = 0) {
            setThemeLight;
        } else if(setThemeSlider.value = 1) {
            setThemeDark;
        }
    });
}

function accountSignIn() {
    console.log();
}

function continueForgotPassword() {
    window.location.href = "forgotPassword2.html";
}

function setThemeLight() {
    let currentTheme = document.querySelector("[data-theme]");
    currentTheme = "light";
}

function setThemeDark() {
    let currentTheme = document.querySelector("[data-theme]");
    currentTheme = "dark";
}

function displayCartProduct() {

}