// Install the service worker and cache files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('barcode-scanner-cache').then(function(cache) {
      return cache.addAll([
        '/barcode-scanner-pwa/',
        '/barcode-scanner-pwa/index.html',
        '/barcode-scanner-pwa/app.js',
        '/barcode-scanner-pwa/manifest.json',
        '/barcode-scanner-pwa/icons/icon-192x192.png',
        '/barcode-scanner-pwa/icons/icon-512x512.png'
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
