const CACHE_NAME = 'nixoshin-v1.1';
const APP_SHELL = [
    './',
    './dashboard.html',
    './index.html',
    './result.html',
    './style.css',
    './script.js',
    './manifest.json',
    './assets/nixoshin logo.png',
    './stickerss/cat.png',
    './stickerss/dog.jpg',
    'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&family=Dancing+Script:wght@700&display=swap'
];

// Install: cache app shell
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(APP_SHELL))
            .then(() => self.skipWaiting())
    );
});

// Activate: clean old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// Fetch: cache-first for app shell, network-first for everything else
self.addEventListener('fetch', event => {
    // Skip non-GET and cross-origin (camera streams, etc.)
    if (event.request.method !== 'GET') return;
    
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request).then(response => {
                // Cache successful HTML/CSS/JS responses
                if (response && response.status === 200 && response.type === 'basic') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            }).catch(() => cached);
        })
    );
});