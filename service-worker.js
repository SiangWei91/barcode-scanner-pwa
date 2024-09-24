// Install the service worker and cache files
const CACHE_NAME = 'barcode-scanner-cache-v3';
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
  if (event.request.url.includes('productList.json')) {
    // For productList.json, always go to network
    event.respondWith(fetch(event.request));
  } else {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          return response || fetch(event.request);
        })
    );
  }
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
