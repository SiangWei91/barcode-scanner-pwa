// Install the service worker and cache files
const CACHE_NAME = 'barcode-scanner-cache-v2';
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
    // For productList.json, always fetch from network and update cache
    event.respondWith(
      fetch(event.request).then(function(response) {
        // Clone the response because we're going to use it twice
        const responseToCache = response.clone();
        
        caches.open(CACHE_NAME)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });

        return response;
      }).catch(function() {
        // If network fetch fails, try to get it from cache
        return caches.match(event.request);
      })
    );
  } else {
    // For all other requests, try the cache first, then network
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
    );
  }
});

self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
