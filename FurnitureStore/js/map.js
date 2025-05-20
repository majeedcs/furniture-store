import { fetchData } from './modules/fetchWrapper.js';

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // load json data
    const data = await fetchData("data/places.json");

    // map category id to category
    const categories = {};
    data.categories.forEach(cat => {
      categories[cat.id] = cat;
    });

    // create leaflet map
    const map = L.map("map").setView([45.53, -73.65], 10);

    // add map tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // get html list
    const list = document.getElementById("places");

    // add each place
    data.places.forEach(place => {
      const [lng, lat] = place.point.coordinates.split(",").map(Number);
      const category = categories[place.categoryId];

      const icon = L.icon({
        iconUrl: category.markerIcon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],// 1/2 size, size
        popupAnchor: [0, -32]
      });

      const marker = L.marker([lat, lng], { icon }).addTo(map);
      marker.bindPopup(`<strong>${place.name}</strong><br>${place.description}`);

      const li = document.createElement("li");
      li.textContent = place.name;
      li.addEventListener("click", () => {
        map.setView([lat, lng], 16);
        marker.openPopup();
      });

      list.appendChild(li);
    });

  } catch (error) {
    console.log("failed to load places:", error);
  }
});
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
