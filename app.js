const map = L.map("map").setView([37.44472, -122.15298], 15);

L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors"
  }
).addTo(map);

// 🔴 HARD-CODED TEST MARKER
L.marker([37.44472, -122.15298]).addTo(map)
  .bindPopup("TEST PIN")
  .openPopup();
