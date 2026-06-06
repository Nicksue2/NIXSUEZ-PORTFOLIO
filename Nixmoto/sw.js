const CACHE_NAME = 'nixmoto-v1';
const ASSETS_TO_CACHE = [
  '/Nixmoto/',
  '/Nixmoto/index.html',
  '/Nixmoto/style.css',
  '/Nixmoto/app.js',
  '/Nixmoto/manifest.json',
  '/Nixmoto/icon512.png',
  'https://cdn.tailwindcss.com',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2',
  'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@300;400;500&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Only intercept GET requests
  if (event.request.method !== 'GET') return;

  // Don't intercept Supabase API calls so they can fail and be handled by app.js correctly when offline
  if (event.request.url.includes('supabase.co')) return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                // Only cache local and specific CDN resources
                if (event.request.url.startsWith(self.location.origin) || 
                    event.request.url.includes('cdn.tailwindcss.com') ||
                    event.request.url.includes('jsdelivr.net') ||
                    event.request.url.includes('fonts.googleapis.com') ||
                    event.request.url.includes('fonts.gstatic.com')) {
                  cache.put(event.request, responseToCache);
                }
              });

            return response;
          }
        ).catch(() => {
          // If network fails (offline) and not in cache, fallback
          // (Usually already handled by caches.match above for static assets)
        });
      })
  );
});
