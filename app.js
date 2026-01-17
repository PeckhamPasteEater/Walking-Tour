const VISITED_KEY = "hidden-history-visited";

function getVisited() {
  return JSON.parse(localStorage.getItem(VISITED_KEY)) || {};
}

function saveVisited(data) {
  localStorage.setItem(VISITED_KEY, JSON.stringify(data));
}


let notified = new Set();

let notificationsEnabled = false;


/* ---------- MAP SETUP ---------- */

const map = L.map("map");

const tileLayer = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 19,
    attribution: "© OpenStreetMap © CARTO"
  }
).addTo(map);

/* ---------- MARKERS ---------- */

const markers = {};
const bounds = [];

locations.forEach(loc => {
  // Safety check
  if (typeof loc.lat !== "number" || typeof loc.lng !== "number") return;

  const marker = L.marker([loc.lat, loc.lng]).addTo(map);
  marker.on("click", () => openInfo(loc));

  markers[loc.id] = marker;
  bounds.push([loc.lat, loc.lng]);
});

/* Zoom map to show ALL pins */
if (bounds.length > 0) {
  map.fitBounds(bounds, { padding: [40, 40] });
} else {
  // Fallback if no locations load
  map.setView([51.505, -0.09], 13);
}

/* ---------- INFO PANEL ---------- */

function openInfo(loc) {
  document.getElementById("info-title").textContent = loc.title;
  document.getElementById("info-description").textContent = loc.description;
  document.getElementById("info-image").src = loc.image || "";
  document.getElementById("info-panel").classList.remove("hidden");
}

function closeInfo() {
  document.getElementById("info-panel").classList.add("hidden");
}

/* ---------- SEARCH ---------- */

document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();

  locations.forEach(loc => {
    const marker = markers[loc.id];
    if (!marker) return;

    if (loc.title.toLowerCase().includes(q)) {
      marker.addTo(map);
    } else {
      map.removeLayer(marker);
    }
  });
});

/* ---------- NOTIFICATIONS ---------- */

async function notify(loc) {
  if (!notificationsEnabled) return;
  if (Notification.permission !== "granted") return;
  if (notified.has(loc.id)) return;

  notified.add(loc.id);

  const reg = await navigator.serviceWorker.ready;

  reg.showNotification("Hidden History Nearby", {
    body: loc.title,
    data: loc.id
  });
}


/* ---------- LOCATION TRACKING ---------- */

let userMarker;

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    pos => {
      const user = [pos.coords.latitude, pos.coords.longitude];

      // Show user location on map
      if (!userMarker) {
        userMarker = L.circleMarker(user, {
          radius: 6,
          color: "#007aff",
          fillColor: "#007aff",
          fillOpacity: 1
        }).addTo(map);
      } else {
        userMarker.setLatLng(user);
      }

      // Check proximity to locations
      locations.forEach(loc => {
        const dist = map.distance(user, [loc.lat, loc.lng]);

       if (dist < 50) {
      notify(loc);
      markVisited(loc);
      }

      });
    },
    err => {
      console.error("Geolocation error", err);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 10000
    }
  );
}


/* ---------- SERVICE WORKER ---------- */

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./service-worker.js");
}



/*---auto open information---*/
window.addEventListener("load", () => {
  const id = window.location.hash.replace("#", "");
  if (!id) return;

  const loc = locations.find(l => l.id === id);
  if (loc) {
    map.setView([loc.lat, loc.lng], 17);
    openInfo(loc);
  }
});



/*----Test stuff---*/
async function forceNotification() {
  if (!("serviceWorker" in navigator)) {
    alert("No service worker");
    return;
  }

  const reg = await navigator.serviceWorker.ready;

  reg.showNotification("Force Test", {
    body: "If you see this, notifications work."
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-app");

  if (!startBtn) {
    console.error("Start button not found");
    return;
  }

  startBtn.addEventListener("click", async () => {
    console.log("Continue clicked");

    // Ask for notification permission
    if ("Notification" in window) {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        notificationsEnabled = true;
      }
    }

    // Trigger location permission
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {},
        () => {}
      );
    }

    // Hide splash screen
    document.getElementById("splash").style.display = "none";
  });
});


function markVisited(loc) {
  const visited = getVisited();

  if (visited[loc.id]) return;

  visited[loc.id] = new Date().toISOString();
  saveVisited(visited);
}


// visited list UI

function openVisited() {
  const list = document.getElementById("visited-list");
  list.innerHTML = "";

  const visited = getVisited();
  const entries = Object.entries(visited)
    .sort((a, b) => new Date(b[1]) - new Date(a[1]));

  if (entries.length === 0) {
    list.innerHTML = "<li>No places visited yet.</li>";
  }

  entries.forEach(([id, dateString]) => {
    const loc = locations.find(l => l.id === id);
    if (!loc) return;

    const li = document.createElement("li");

    const date = new Date(dateString);
    const formatted = date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    });

    li.innerHTML = `
      <strong>${loc.title}</strong><br>
      <small>Visited ${formatted}</small>
    `;

    li.onclick = () => {
      map.setView([loc.lat, loc.lng], 17);
      openInfo(loc);
      closeVisited();
    };

    list.appendChild(li);
  });

  document.getElementById("visited-panel").classList.remove("hidden");
}


function closeVisited() {
  document.getElementById("visited-panel").classList.add("hidden");
}

window.addEventListener("DOMContentLoaded", () => {
  const visitedBtn = document.getElementById("open-visited");

  if (!visitedBtn) {
    console.error("Visited button not found");
    return;
  }

  visitedBtn.addEventListener("click", openVisited);
});




