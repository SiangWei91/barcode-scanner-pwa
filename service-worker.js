// Install the service worker and cache files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('barcode-scanner-cache').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/manifest.json',
        '/service-worker.js',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png'
      ]);
    })
  );
});

// Fetch the resources from the cache or network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
