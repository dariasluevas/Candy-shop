const CACHE_NAME = 'candy-shop-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/tovar.html',
  '/korz.html',
  '/main.css',
  '/img/choco.jpg',
  '/img/strawb.png',
  '/img/cake.png',
  '/img/byket.png',
  '/img/sweets.png',
  '/img/home.png',
  '/img/korp.jpg',
  '/img/11.jpg',
  '/img/12.jpg',
  '/img/13.jpg',
  '/img/14.jpg',
  '/img/1.png',
  '/img/2.jpg',
  '/img/3.png',
  '/img/4.png',
  '/img/5.png',
  '/img/6.png',
  '/img/7.png',
  '/img/8.png',
  '/img/9.png',
  './logo1.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          response => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
