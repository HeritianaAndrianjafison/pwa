const CACHE_NAME = "pwa-cache-v1";
const FILES_TO_CACHE = [
  '/',
  'index.html',
  'page_2.html',
  'app.js',
  'manifest.json',
  'offline.html', // Ajoute cette page dans le cache
  'dexie.min.js',
  'icon-192.png'
];

// INSTALLATION : mise en cache des fichiers
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// FETCH : gestion des requêtes et du mode offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Si trouvé dans le cache, on retourne la version offline
      if (response) return response;

      // Sinon, on essaie d'aller chercher sur le réseau
      return fetch(event.request).catch(() => {
        // En cas d'échec (hors ligne), on affiche une page par défaut
        return caches.match('/offline.html');
      });
    })
  );
});
