self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("app-cache").then(cache => {
      return cache.addAll([
        "index.html",
        "adventskalender.html",
        "dienste.html",
        "laufmappe.html",
        "style.css",
        "style1.css",
        "script.js",
        "script1.js",
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
