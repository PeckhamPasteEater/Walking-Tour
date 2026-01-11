let notified = new Set();

const map = L.map("map").setView([locations[0].lat, locations[0].lng], 15);

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
    crossOrigin: true
  }
).addTo(map);


const markers = {};

locations.forEach(loc => {
  const marker = L.marker([loc.lat, loc.lng]).addTo(map);
  marker.on("click", () => openInfo(loc));
  markers[loc.id] = marker;
});

// Info panel
function openInfo(loc) {
  document.getElementById("info-title").textContent = loc.title;
  document.getElementById("info-description").textContent = loc.description;
  document.getElementById("info-image").src = loc.image;
  document.getElementById("info-panel").classList.remove("hidden");
}

function closeInfo() {
  document.getElementById("info-panel").classList.add("hidden");
}

// Search
document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  locations.forEach(loc => {
    if (loc.title.toLowerCase().includes(q)) {
      markers[loc.id].addTo(map);
    } else {
      map.removeLayer(markers[loc.id]);
    }
  });
});

// Notifications
async function notify(loc) {
  if (notified.has(loc.id)) return;

  notified.add(loc.id);

  const reg = await navigator.serviceWorker.ready;
  reg.showNotification("Hidden History Nearby", {
    body: loc.title,
    data: loc.id
  });
}

// Location tracking
if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(pos => {
    const user = [pos.coords.latitude, pos.coords.longitude];

    locations.forEach(loc => {
      const dist = map.distance(user, [loc.lat, loc.lng]);
      if (dist < 50) notify(loc);
    });
  }, null, { enableHighAccuracy: true });
}

// Service worker
// TEMPORARILY DISABLED FOR DEBUGGING
// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("service-worker.js");
// }

