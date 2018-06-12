/*cache name*/
var appCacheName = 'restaurant-review-v1';

/*cache the static info when install*/
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(appCacheName).then(function(cache) {
      return cache.addAll([
        '/skeleton',
        '/index.html',
        '/restaurant.html',
        '/data/restaurants.json',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',
        'css/styles.css'
      ]);
    })
  );
});

// self.addEventListener('activate', function (event) {
//   event.waitUntil(caches.keys().then(function (cacheNames) {
//     return Promise.all(cacheNames.filter(function (cacheName) {
//       return cacheName.startsWith('restaurant-') && cacheName != appCacheName;
//     }).map(function (cacheName) {
//       return cache.delete(cacheName);
//     }));
//   }));
// });
//
// /*if the requested info is in cache, serve it */
// self.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       if(response) return response;
//        return fetch(event.request);
//     })
//   );
// });
