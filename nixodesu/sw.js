const CACHE_NAME = "nixodesu-v2.9";
const ASSETS = [
  "/nixodesu/",
  "/nixodesu/index.html",
  "/nixodesu/practice.html",
  "/nixodesu/dashboard.html",
  "/nixodesu/css/style.css",
  "/nixodesu/css/dashboard.css",
  "/nixodesu/css/variables.css",
  "/nixodesu/css/common.css",
  "/nixodesu/css/auth.css",
  "/nixodesu/css/landing.css",
  "/nixodesu/js/app.js",
  "/nixodesu/js/theme.js",
  "/nixodesu/js/supabase.js",
  "/nixodesu/js/cursor.js",
  "/nixodesu/manifest.json",
  "/nixodesu/assets/nixodesu-logo.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request)),
  );
});
