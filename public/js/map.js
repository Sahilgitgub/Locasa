// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//   container: "map", // container ID
//   center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
//   zoom: 9, // starting zoom
// });
// console.log(coordinates);
// const marker = new mapboxgl.Marker()
//   .setLngLat(coordinates) //lisitng.geometry.coordinates
//   .addTo(map);
// var map = L.map("map").setView([38.7946, 106.5348], 13); // Delhi, India

// // Load and display tile layers on the map (OpenStreetMap tiles)
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution: "© OpenStreetMap contributors",
// }).addTo(map);

// L.marker([38.7946, 106.5348])
//   .addTo(map)
//   .bindPopup("Welcome to Locasa")
//   .openPopup();

// public/js/map.js

if (typeof locationString !== "undefined") {
  fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${locationString}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0]; // Create map

        const map = L.map("map").setView([lat, lon], 9); // Add tile layer

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "© OpenStreetMap",
        }).addTo(map); // Marker

        L.marker([lat, lon]).addTo(map).bindPopup(display_name).openPopup();
        var popup = L.popup();

        function onMapClick(e) {
          popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
        }
        map.on("click", onMapClick);
      } else {
        console.error("Location not found.");
      }
    })
    .catch((err) => {
      console.error("Geocoding failed:", err);
    });
}

function confirmDelete() {
  return confirm("Are you sure you want to delete this listing?");
}
