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
    self.clients.matchAll({ type: "window", includeUncontrolled: true })
      .then(clientList => {
        for (const client of clientList) {
          if ("focus" in client) {
            client.focus();
            client.navigate(`./#${id}`);
            return;
          }
        }

        if (self.clients.openWindow) {
          return self.clients.openWindow(`./#${id}`);
        }
      })
  );
});
