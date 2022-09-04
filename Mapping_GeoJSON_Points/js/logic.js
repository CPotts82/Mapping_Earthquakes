// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Add another tile layer to create the dark map
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2, 
    layers: [streets]
});

// Pass omap layers into layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessin the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/CPotts82/Mapping_Earthquakes/main/majorAirports.json"


// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
    // Creating a GeoJson layer with the retrieved data
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            console.log(feature);
            return L.marker(latlng)
            .bindPopup("<h2>" + "Airport ID: " + feature.properties.id + "</h2><hr><h2>" + "Airport Name: " + feature.properties.name + "</h2>")
        }
    }).addTo(map);
});

