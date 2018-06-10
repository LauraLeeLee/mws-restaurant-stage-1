
/*cache name*/
var appCacheName = 'restaurant-review-v3';

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

/*delte any old versions of the cache*/
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheVersions) {
      return Promise.all(
        cacheVersions.filter(function(cacheVersion) {
          return cacheVersion.startsWith('restaurant-') && cacheVersion != appCacheName;
        }).map(function(cacheVersion) {
          return caches.delete(cacheVersion);
        })
      );
    })
  );
});


/*if the requested info is in cache, serve it */
self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);

  if(requestUrl.origin === location.origin) {
    if(requestUrl.pathname === '/') {
      event.respondWith(caches.match('/skeleton'));
      return;
    }
  }

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
  if(event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});