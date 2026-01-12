self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  self.clients.claim();
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  const id = event.notification.data;

  event.waitUntil(
    self.clients.openWindow(`./#${id}`)
  );
});
