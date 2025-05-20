import { fetchData } from './modules/fetchWrapper.js';

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("dbz-container");

async function fetchCharacters() {
    try {
        const resourceURI = 'https://dragonball-api.com/api/characters';
        const data = await fetchData(resourceURI);
      renderCharacters(data.items);
    } catch (error) {
        console.log(`An error occurred while fetching the characters. ${error.message}`);
    }

}
function renderCharacters(characters) {
  characters.forEach(character => {
    const col = document.createElement("div");
    col.classList.add("col-md-4", "mb-4");

    const card = document.createElement("div");
    card.classList.add("card", "h-100");

    const img = document.createElement("img");
    img.classList.add("card-img-top");
    img.src = character.image;
    img.alt = character.name;
    img.width = 400;
    img.height = 400;


    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = character.name;

    const race = document.createElement("p");
    race.classList.add("card-text");
    race.textContent = 'Race: ' + character.race;

    const gender = document.createElement("p");
    gender.classList.add("card-text");
    gender.textContent = `Gender: ${character.gender}`;

    cardBody.appendChild(title);
    cardBody.appendChild(race);
    cardBody.appendChild(gender);

    card.appendChild(img);
    card.appendChild(cardBody);
    col.appendChild(card);

    container.appendChild(col);
  });
}
  fetchCharacters();
});

