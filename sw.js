const CACHE_NAME = 'sonsuzay-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/oyunlar.html',
  '/uygulamalar.html',
  '/indir.html',
  '/player.html',
  '/saat.html',
  '/site_simge.png',
  '/manifest.json'
];

// Yükleme (Install) sırasında dosyaları önbelleğe al
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Dosyalar önbelleğe alınıyor...');
        return cache.addAll(urlsToCache);
      })
  );
});

// İstek (Fetch) sırasında önbellekten sun
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Önbellekte varsa onu döndür, yoksa internetten çek
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
