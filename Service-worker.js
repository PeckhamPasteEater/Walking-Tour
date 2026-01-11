self.addEventListener("notificationclick", event => {
  const locationId = event.notification.data;
  event.notification.close();

  event.waitUntil(
    clients.openWindow(`index.html#${locationId}`)
  );
});
