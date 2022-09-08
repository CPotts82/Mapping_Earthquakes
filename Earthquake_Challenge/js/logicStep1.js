// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Add another tile layer to create the dark map
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Streets" : streets,
    "Satellite" : satelliteStreets
  };

// Create the map object with center at the San Francisco airport.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3, 
    layers: [streets]
});

// Pass map layers into layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Retrieve the earthquake GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJSON(data).addTo(map);
});

// Create a style for the lines.
//let myStyle = {
    //fillColor: "yellow",
    //lineColor: "blue",
    //weight: 1,
//}

// Grabbing our GeoJSON data.
//d3.json(torontoHoods).then(function(data) {
    //console.log(data);
    // Creating a GeoJson layer with the retrieved data
    //L.geoJson(data, {
    //style: myStyle,
    //onEachFeature: function(feature, layer) {
        //layer.bindPopup("<h3>" + "Neighborhood: " + feature.properties.AREA_NAME + "</h3>")
    //}}).addTo(map);
//});




