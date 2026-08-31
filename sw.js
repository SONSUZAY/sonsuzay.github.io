const CACHE_NAME = 'sonsuzay-v4.1';
const urlsToCache = [
  './',
  './index.html',
  './site_simge.png',
  './manifest.json',
  './guncellemeler.html',
  './play-uygulamalar/index.html',
  './hikayeler/index.html',
  './web-uygulamalar/index.html',
  './oyunlar-web/index.html',
  './yildizay-web/index.html'
];

// Servis işçisi yüklendiğinde
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Yeni Sistem Önbelleğe Alınıyor...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Yeni versiyon aktif edildiğinde eski önbelleği temizle
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eski önbellek temizleniyor:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// İstekleri karşıla (Önce önbellek, yoksa ağ)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
