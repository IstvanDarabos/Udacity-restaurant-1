const staticCacheName = "stat-restaurant-1";
const urlToCache = [
    '/',
    '/favicon.ico',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
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

self.addEventListener('fetch', function (event) {
    console.log(event.request);
    event.respondWith(
        caches.match(event.request)
        .then(function (response) {
            if (response) return response;
            return fetch(event.request);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith(staticCacheName) &&
                        cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            )
        })
    );
});
