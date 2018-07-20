const staticCacheName = "stat-restaurant-1";
const urlToCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    '/js/idb.js',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    // include other new resources for the new version...
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll(urlToCache);
    })
  );
});

/*
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(cacheNames.map(cache => {
      if (cache !== staticCacheName) {
        return caches.delete(cache);
      }
    })))
  )
})
*/

// SW activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      // Delete all other versions of the 'stat-restaurant' cache except for the current one
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return (
              cacheName.startsWith('stat-restaurant') &&
              staticCacheName != cacheName
            );
          })
          .map(cacheName => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

// var myRequest = new Request('flowers.jpg');
// var myURL = myRequest.url; // "http://mdn.github.io/fetch-examples/fetch-request/flowers.jpg"

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        let responseClone = response.clone();
        caches.open(staticCacheName).then(function(cache) {
          cache.put(event.request.url, responseClone);
        });
        return response;
      });
    }).catch(function() {
      return caches.match('./img/myLittleVader.jpg');
    })
  );
});

