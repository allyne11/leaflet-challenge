# leaflet-challenge
# Earthquake & Tectonic Plate Visualization Map

## Overview
This project is an interactive web map that visualizes real-time earthquake data and global tectonic plate boundaries using **Leaflet.js** and **D3.js**. The map dynamically fetches data from the **United States Geological Survey (USGS)** and the **Fraxen Tectonic Plate Boundaries GeoJSON** repository.

## Features
- **Interactive Map**: Users can view earthquakes worldwide, colored by depth and sized by magnitude.
- **Multiple Base Layers**: Toggle between a standard basemap and a street map.
- **Earthquake Data**:
  - Displays earthquakes from the past week.
  - Uses circle markers where size represents magnitude and color represents depth.
  - Provides popups with detailed earthquake information.
- **Tectonic Plate Boundaries**: Overlays the global tectonic plate boundaries.
- **Legend**: A legend helps users interpret earthquake depth colors.
- **Layer Controls**: Users can toggle earthquake data and tectonic plate layers.

## Technologies Used
- **Leaflet.js** – for rendering the interactive map
- **D3.js** – for fetching and processing GeoJSON data
- **USGS Earthquake API** – for real-time earthquake data
- **Fraxen's Tectonic Plates GeoJSON** – for tectonic plate boundaries
- **HTML, JavaScript, and CSS**

## Installation & Setup

### Prerequisites
Ensure you have a local server running. If you have Python installed, you can use the built-in HTTP server.

### Running the Project
1. **Clone or download** this repository.
2. Navigate to the project folder in a terminal or command prompt.
3. Run a local server:
   ```sh
   python3 -m http.server 8000
   ```
4. Open your browser and go to:
   ```
   http://localhost:8000
   ```

### Data Sources
- **Earthquake Data**: [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)
- **Tectonic Plate Boundaries**: [Fraxen GitHub Repository](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json)

## File Structure
```
📂 Project Folder
 ├── 📜 index.html         # Main HTML file
 ├── 📜 script.js         # JavaScript for map logic
 ├── 📜 style.css         # Optional styling
```

## Notes
- The project was tested and run on **localhost:8000**.
- Ensure your browser allows fetching external resources when running a local server.

## Future Improvements
- Add real-time filtering for earthquakes based on magnitude.
- Display historical earthquake data.
- Improve styling with custom UI elements.

## License
This project is open-source and available for use and modification.

---
Happy mapping! 🌍🚀

