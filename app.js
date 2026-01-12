let notified = new Set();

/* ---------- MAP SETUP ---------- */

const map = L.map("map");

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors"
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
  if (!("serviceWorker" in navigator)) return;
  if (notified.has(loc.id)) return;

  notified.add(loc.id);

  const reg = await navigator.serviceWorker.ready;
  reg.showNotification("Hidden History Nearby", {
    body: loc.title,
    data: loc.id
  });
}

/* ---------- LOCATION TRACKING ---------- */

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    pos => {
      const user = [pos.coords.latitude, pos.coords.longitude];

      locations.forEach(loc => {
        const dist = map.distance(user, [loc.lat, loc.lng]);
        if (dist < 50) notify(loc);
      });
    },
    null,
    { enableHighAccuracy: true }
  );
}

let userMarker;

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    pos => {
      const user = [pos.coords.latitude, pos.coords.longitude];

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

      locations.forEach(loc => {
        const dist = map.distance(user, [loc.lat, loc.lng]);
        if (dist < 50) notify(loc);
      });
    },
    null,
    { enableHighAccuracy: true }
  );
}


/* ---------- SERVICE WORKER ---------- */

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

document
  .getElementById("enable-notifications")
  .addEventListener("click", async () => {
    const permission = await Notification.requestPermission();
    alert("Notification permission: " + permission);
  });

