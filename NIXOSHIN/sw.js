const CACHE_NAME = 'nixoshin-v2.0';
const APP_SHELL = [
    './',
    './index.html',
    './dashboard.html',
    './result.html',
    './session.html',
    './style.css',
    './script.js',
    './nixoshin-utils.js',
    './manifest.json',
    './assets/nixoshin-logo.png',
    './stickerss/cat.png',
    './stickerss/dog.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
        ))
    );
});

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        fetch(event.request)
            .then(response => {
                // If network works, return it and update cache
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            })
            .catch(() => {
                // If network fails (offline), use cache
                return caches.match(event.request);
            })
    );
});