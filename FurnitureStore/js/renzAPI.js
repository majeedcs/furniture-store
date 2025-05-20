import { fetchData, createCustomElement } from './modules/fetchWrapper.js'

document.addEventListener("DOMContentLoaded", loadAPI);

function loadAPI() {
    console.log('loading data');
    const btnFetchJokes = document.querySelector('#btn-fetch-jokes');
    btnFetchJokes.addEventListener('click', fetchJoke);
}

async function fetchJoke() {
    try {
        const resourceURI = 'https://v2.jokeapi.dev/joke/Any?type=single&amount=10';
        const jokes = await fetchData(resourceURI);

        parseJokes(jokes.jokes);

    } catch (error) {
        console.error("Failed to fetch API data:", error);
        return null;
    }
}

function parseJokes(jokes) {
    const showJokes = document.getElementById('show-jokes');
    showJokes.innerHTML = '';
    jokes.forEach(joke => {
        const tr = createCustomElement(showJokes, 'tr', '');
        const colID = createCustomElement(tr, 'td', joke.id);
        const colCategory = createCustomElement(tr, 'td', joke.category);
        const colSafe = createCustomElement(tr, 'td', joke.safe);
        const colLanguage = createCustomElement(tr, 'td', joke.lang);
        const activeFlags = Object.entries(joke.flags)
            .filter(([key, value]) => value === true)
            .map(([key]) => key)
            .join(', ') || 'None';
        const colFlags = createCustomElement(tr, 'td', activeFlags);
        const colJoke = createCustomElement(tr, 'td', joke.joke);
    });
}