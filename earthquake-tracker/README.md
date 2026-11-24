# Earthquake Tracker (CSE-2340 MP3-MP4)
#Deployment Link: https://samir-ali88.github.io/SD-1/earthquake-tracker/
An interactive, API-driven web application built with **HTML, CSS, and Vanilla JavaScript** that tracks live global seismic events using the **USGS Earthquake Hazards Program API**.

## Features Implemented (Assignment Requirements)
1. **DOM Manipulation & Dynamic Rendering**: Dynamically creates earthquake cards, summary statistics, and a detailed inspection panel using `document.getElementById()`, `document.createElement()`, and `querySelector()`.
2. **Event Handling & Array Methods**: Uses `addEventListener()` for real-time search, magnitude filtering, sorting, and card selection, powered by `map()`, `filter()`, `forEach()`, `findIndex()`, `some()`, and `reduce()`.
3. **Live API Integration (`fetch` + `async/await`)**: Connects directly to the official public USGS GeoJSON feeds (`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/...`) with no API key required, including complete Loading, Error (with retry), and Empty states.
4. **Local Storage Persistence**: Allows users to bookmark earthquakes into a **Saved Watchlist** (`localStorage`) that persists across page refreshes and browser sessions.

## How to Run
1. Extract the ZIP archive.
2. Open `index.html` directly in any web browser (or run via VS Code Live Server).
