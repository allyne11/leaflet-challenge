// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map.
let streetMap = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, HOT'
});

// Create the map object with center and zoom options.
let map = L.map("map", {
  center: [20, 0], // Centered near the equator
  zoom: 2.5,
  layers: [basemap] // Default layer
});

// Then add the 'basemap' tile layer to the map.
basemap.addTo(map);

// OPTIONAL: Step 2
// Create the layer groups for our two sets of data: earthquakes and tectonic plates.
let earthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup();

// Define base maps for the layer control.
let baseMaps = {
  "Basemap": basemap,
  "Street Map": streetMap
};

// Define overlay maps for the data layers.
let overlayMaps = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates
};

// Add a control to the map that will allow the user to change which layers are visible.
L.control.layers(baseMaps, overlayMaps).addTo(map);

// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each earthquake based on magnitude and depth.
  function styleInfo(feature) {
    return {
      radius: getRadius(feature.properties.mag),
      fillColor: getColor(feature.geometry.coordinates[2]), // Depth is the third coordinate in the array
      color: "#000",
      weight: 0.5,
      opacity: 1,
      fillOpacity: 0.8
    };
  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
    return depth > 90 ? "#ff3333" :
           depth > 70 ? "#ff6633" :
           depth > 50 ? "#ff9933" :
           depth > 30 ? "#ffcc33" :
           depth > 10 ? "#ffff33" :
                        "#ccff33";
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    return magnitude > 0 ? magnitude * 4 : 1; // Ensure small magnitude values still have a visible radius
  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude, location, and depth.
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        `<h3>${feature.properties.place}</h3><hr>
         <p>Magnitude: ${feature.properties.mag}</p>
         <p>Depth: ${feature.geometry.coordinates[2]} km</p>
         <p>Time: ${new Date(feature.properties.time)}</p>`
      );
    }
  }).addTo(earthquakes);

  // Add the earthquake layer to the map.
  earthquakes.addTo(map);

  // Create a legend control object.
  let legend = L.control({ position: "bottomright" });

  // Then add all the details for the legend.
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    let depthIntervals = [-10, 10, 30, 50, 70, 90];
    let colors = ["#ccff33", "#ffff33", "#ffcc33", "#ff9933", "#ff6633", "#ff3333"];

    // Loop through our depth intervals to generate a label with a colored square for each interval.
    for (let i = 0; i < depthIntervals.length; i++) {
      div.innerHTML +=
        `<i style="background:${colors[i]}; width: 20px; height: 20px; display: inline-block;"></i> ` +
        depthIntervals[i] + (depthIntervals[i + 1] ? "&ndash;" + depthIntervals[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // Finally, add the legend to the map.
  legend.addTo(map);

  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
    // Save the geoJSON data, along with style information, to the tectonic_plates layer.
    L.geoJson(plate_data, {
      style: {
        color: "orange",
        weight: 2
      }
    }).addTo(tectonicPlates);

    // Then add the tectonic_plates layer to the map.
    tectonicPlates.addTo(map);
  });
});
