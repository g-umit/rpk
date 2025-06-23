self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("app-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "adventskalender.html",
        "dienste.html",
        "laufmappe.html",
        "notizen.html",
        "style.css",
        "style1.css",
        "style2.css",
        "script.js",
        "script1.js",
        "script2.js",
        "manifest.json",
        "icon-192.png"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// Für manuelle Push aus der Seite (z. B. geplante Erinnerung)
self.addEventListener("message", event => {
  if (event.data && event.data.type === "push") {
    const { title, body } = event.data;
    self.registration.showNotification(title, {
      body,
      vibrate: [200, 100, 200],
      icon: "icon-192.png",
      badge: "icon-192.png"
    });
  }
});
