let currentStopId = null;

const map = L.map("map").setView(
  [tourStops[0].lat, tourStops[0].lng],
  15
);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors"
}).addTo(map);

tourStops.forEach(stop => {
  L.marker([stop.lat, stop.lng]).addTo(map).bindPopup(stop.title);
});

function showStop(stop) {
  if (currentStopId === stop.id) return;
  currentStopId = stop.id;

  document.getElementById("stop-title").textContent = stop.title;
  document.getElementById("stop-description").textContent = stop.description;

  const img = document.getElementById("stop-image");
  img.src = stop.image;
  img.style.display = "block";

  const audio = document.getElementById("stop-audio");
  audio.src = stop.audio;
  audio.play();

  const nextStop = tourStops.find(s => s.id === stop.id + 1);
  const directions = document.getElementById("directions");

  if (nextStop) {
    directions.href =
      `https://www.openstreetmap.org/directions?route=` +
      `${stop.lat},${stop.lng};${nextStop.lat},${nextStop.lng}`;
    directions.textContent = "Directions to next stop →";
  } else {
    directions.textContent = "Tour complete 🎉";
    directions.removeAttribute("href");
  }
}

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(pos => {
    const user = [pos.coords.latitude, pos.coords.longitude];

    tourStops.forEach(stop => {
      const d = map.distance(user, [stop.lat, stop.lng]);
      if (d < stop.radius) showStop(stop);
    });
  }, null, { enableHighAccuracy: true });
}

// PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
