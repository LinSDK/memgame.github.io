const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/img/img1.png',
  '/img/img2.png',
  '/img/img3.png',
  '/img/img4.png',
  '/img/img5.png',
  '/img/img6.png',
  '/img/img7.png',
  '/img/img8.png',
  '/img/logo.png',
  '/index.html',
  '/fonts/Unageo-Regular.ttf',
  '/confetti.browser.min.js',
  '/icon512_rounded.png',
  '/icon512_maskable.png'
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
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
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