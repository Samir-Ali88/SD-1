// USGS GeoJSON Feed Endpoints (Free, Public, CORS-enabled, No API Key Required)
const USGS_BASE_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary";
const STORAGE_KEY = "earthquake_tracker_saved_v1";

// Application State
let allEarthquakes = [];
let selectedQuakeId = null;
let savedEarthquakes = loadSavedFromStorage();

// DOM Selectors
const searchInput = document.getElementById("searchInput");
const timeRangeSelect = document.getElementById("timeRangeSelect");
const magFilterSelect = document.getElementById("magFilterSelect");
const sortSelect = document.getElementById("sortSelect");
const savedOnlyToggle = document.getElementById("savedOnlyToggle");
const refreshBtn = document.getElementById("refreshBtn");
const retryBtn = document.getElementById("retryBtn");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const clearSavedBtn = document.getElementById("clearSavedBtn");

const earthquakeList = document.getElementById("earthquakeList");
const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const errorMessage = document.getElementById("errorMessage");
const emptyState = document.getElementById("emptyState");

const totalCountEl = document.getElementById("totalCount");
const maxMagEl = document.getElementById("maxMag");
const savedCountEl = document.getElementById("savedCount");
const lastUpdatedEl = document.getElementById("lastUpdated");
const showingCountEl = document.getElementById("showingCount");

const detailContent = document.getElementById("detailContent");
const savedListEl = document.getElementById("savedList");

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  renderSavedWatchlist();
  fetchEarthquakes();
});

// Event Listeners
timeRangeSelect.addEventListener("change", fetchEarthquakes);
refreshBtn.addEventListener("click", fetchEarthquakes);
retryBtn.addEventListener("click", fetchEarthquakes);

searchInput.addEventListener("input", renderEarthquakes);
magFilterSelect.addEventListener("change", renderEarthquakes);
sortSelect.addEventListener("change", renderEarthquakes);
savedOnlyToggle.addEventListener("change", renderEarthquakes);

resetFiltersBtn.addEventListener("click", () => {
  searchInput.value = "";
  magFilterSelect.value = "0";
  sortSelect.value = "time-desc";
  savedOnlyToggle.checked = false;
  renderEarthquakes();
});

clearSavedBtn.addEventListener("click", () => {
  savedEarthquakes = [];
  saveToStorage();
  renderSavedWatchlist();
  renderEarthquakes();
});

// Fetch Data from USGS API using async/await
async function fetchEarthquakes() {
  const feedType = timeRangeSelect.value;
  const endpoint = `${USGS_BASE_URL}/${feedType}.geojson`;

  showState("loading");

  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`USGS API returned HTTP ${response.status}`);
    }

    const data = await response.json();

    // Map raw GeoJSON features into clean structured objects
    allEarthquakes = (data.features || []).map((feature) => {
      const props = feature.properties || {};
      const coords = (feature.geometry && feature.geometry.coordinates) || [0, 0, 0];

      return {
        id: feature.id,
        title: props.title || "Unknown Location",
        place: props.place || "Unspecified Region",
        mag: typeof props.mag === "number" ? props.mag : 0,
        time: props.time || Date.now(),
        url: props.url || "https://earthquake.usgs.gov/",
        tsunami: props.tsunami === 1,
        alert: props.alert || "None",
        felt: props.felt || 0,
        longitude: coords[0],
        latitude: coords[1],
        depth: coords[2]
      };
    });

    updateStats();
    renderEarthquakes();
  } catch (error) {
    console.error("Failed to fetch earthquake data:", error);
    errorMessage.textContent = `Failed to load live seismic feed: ${error.message}`;
    showState("error");
  }
}

// Update Top Dashboard Stats
function updateStats() {
  totalCountEl.textContent = allEarthquakes.length;

  const maxMagnitude = allEarthquakes.reduce(
    (max, q) => (q.mag > max ? q.mag : max),
    0
  );
  maxMagEl.textContent = maxMagnitude.toFixed(1);
  savedCountEl.textContent = savedEarthquakes.length;
  lastUpdatedEl.textContent = new Date().toLocaleTimeString();
}

// Filter, Sort, and Render Earthquake Cards
function renderEarthquakes() {
  const query = searchInput.value.trim().toLowerCase();
  const minMag = parseFloat(magFilterSelect.value);
  const sortBy = sortSelect.value;
  const onlySaved = savedOnlyToggle.checked;

  // Filter using Array.prototype.filter()
  let filtered = allEarthquakes.filter((quake) => {
    const matchesSearch =
      quake.place.toLowerCase().includes(query) ||
      quake.title.toLowerCase().includes(query);
    const matchesMag = quake.mag >= minMag;
    const matchesSaved = !onlySaved || isQuakeSaved(quake.id);

    return matchesSearch && matchesMag && matchesSaved;
  });

  // Sort results
  filtered.sort((a, b) => {
    if (sortBy === "mag-desc") return b.mag - a.mag;
    if (sortBy === "mag-asc") return a.mag - b.mag;
    return b.time - a.time; // default: newest first
  });

  showingCountEl.textContent = `Showing ${filtered.length} event${filtered.length === 1 ? "" : "s"}`;

  if (filtered.length === 0) {
    earthquakeList.innerHTML = "";
    showState("empty");
    return;
  }

  showState("list");
  earthquakeList.innerHTML = "";

  // Dynamically create DOM elements using forEach()
  filtered.forEach((quake) => {
    const card = document.createElement("article");
    card.className = `quake-card ${quake.id === selectedQuakeId ? "selected" : ""}`;

    const magClass = getMagnitudeClass(quake.mag);
    const formattedTime = new Date(quake.time).toLocaleString();
    const saved = isQuakeSaved(quake.id);

    card.innerHTML = `
      <div class="quake-left">
        <div class="mag-badge ${magClass}">${quake.mag.toFixed(1)}</div>
        <div class="quake-info">
          <h3 class="quake-title">${escapeHTML(quake.place)}</h3>
          <p class="quake-meta">${formattedTime} &bull; Depth: ${quake.depth.toFixed(1)} km</p>
        </div>
      </div>
      <button class="save-btn ${saved ? "saved" : ""}" data-id="${quake.id}">
        ${saved ? "Saved" : "Save"}
      </button>
    `;

    // Select card to show details
    card.addEventListener("click", (e) => {
      if (e.target.classList.contains("save-btn")) return;
      selectedQuakeId = quake.id;
      renderEventDetails(quake);
      renderEarthquakes();
    });

    // Save / Unsave button event
    const saveBtn = card.querySelector(".save-btn");
    saveBtn.addEventListener("click", () => {
      toggleSaveEarthquake(quake);
    });

    earthquakeList.appendChild(card);
  });
}

// Render Selected Earthquake Details in Sidebar
function renderEventDetails(quake) {
  const formattedDate = new Date(quake.time).toLocaleString();

  detailContent.innerHTML = `
    <div class="detail-row">
      <span class="detail-label">Location</span>
      <span class="detail-val">${escapeHTML(quake.place)}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Magnitude</span>
      <span class="detail-val">${quake.mag.toFixed(2)} M</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Depth</span>
      <span class="detail-val">${quake.depth.toFixed(2)} km</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Coordinates</span>
      <span class="detail-val">${quake.latitude.toFixed(3)}°, ${quake.longitude.toFixed(3)}°</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Time</span>
      <span class="detail-val">${formattedDate}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Tsunami Warning</span>
      <span class="detail-val">${quake.tsunami ? "Yes (Alert Issued)" : "No"}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Felt Reports</span>
      <span class="detail-val">${quake.felt}</span>
    </div>
    <a href="${quake.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary usgs-link">
      View Official USGS Report
    </a>
  `;
}

// Local Storage Functions
function loadSavedFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("LocalStorage read error:", err);
    return [];
  }
}

function saveToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedEarthquakes));
    savedCountEl.textContent = savedEarthquakes.length;
  } catch (err) {
    console.error("LocalStorage write error:", err);
  }
}

function isQuakeSaved(id) {
  return savedEarthquakes.some((item) => item.id === id);
}

function toggleSaveEarthquake(quake) {
  const existingIndex = savedEarthquakes.findIndex((item) => item.id === quake.id);

  if (existingIndex > -1) {
    savedEarthquakes.splice(existingIndex, 1);
  } else {
    savedEarthquakes.unshift(quake);
  }

  saveToStorage();
  renderSavedWatchlist();
  renderEarthquakes();
}

function renderSavedWatchlist() {
  savedCountEl.textContent = savedEarthquakes.length;

  if (savedEarthquakes.length === 0) {
    savedListEl.innerHTML = `<p class="muted-text">No bookmarked earthquakes yet. Click "Save" on any event to store it in Local Storage.</p>`;
    return;
  }

  savedListEl.innerHTML = "";

  savedEarthquakes.forEach((quake) => {
    const item = document.createElement("div");
    item.className = "saved-item";

    item.innerHTML = `
      <div class="saved-item-info">
        <div class="saved-item-title">M ${quake.mag.toFixed(1)} - ${escapeHTML(quake.place)}</div>
        <div class="saved-item-sub">${new Date(quake.time).toLocaleDateString()}</div>
      </div>
      <button class="remove-saved-btn" title="Remove from watchlist">&times;</button>
    `;

    item.querySelector(".saved-item-info").addEventListener("click", () => {
      selectedQuakeId = quake.id;
      renderEventDetails(quake);
      renderEarthquakes();
    });

    item.querySelector(".remove-saved-btn").addEventListener("click", () => {
      toggleSaveEarthquake(quake);
    });

    savedListEl.appendChild(item);
  });
}

// UI State Helper
function showState(state) {
  loadingState.classList.toggle("hidden", state !== "loading");
  errorState.classList.toggle("hidden", state !== "error");
  emptyState.classList.toggle("hidden", state !== "empty");
  earthquakeList.classList.toggle("hidden", state !== "list");
}

function getMagnitudeClass(mag) {
  if (mag >= 6.0) return "mag-severe";
  if (mag >= 4.5) return "mag-high";
  if (mag >= 2.5) return "mag-mod";
  return "mag-low";
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}
