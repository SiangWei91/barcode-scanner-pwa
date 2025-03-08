const CACHE_NAME = 'barcode-scanner-cache-v4.1';
const urlsToCache = [
  '/barcode-scanner-pwa/',
  '/barcode-scanner-pwa/index.html',
  '/barcode-scanner-pwa/app.js',
  '/barcode-scanner-pwa/manifest.json',
  '/barcode-scanner-pwa/icons/icon-192x192.png',
  '/barcode-scanner-pwa/icons/icon-512x512.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
