/**
 * Smart Vehicle (Pametno Vozilo) — Progressive Web App Service Worker
 * Zero runtime dependencies, high-performance offline shell & asset cache.
 * Cache Version: v2.1.1
 */

const CACHE_NAME = "smart-vehicle-v2.1.1";

const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/404.html",
  "/style.min.css",
  "/script.min.js",
  "/site.webmanifest",
  "/assets/favicon.png?v=3",
  "/assets/icon-192.png",
  "/assets/icon-512.png",
  "/assets/apple-touch-icon.png?v=3",];

// Install Event: Precache static app shell and activate worker immediately
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate Event: Clear outdated caches and claim active clients
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch Event: Network-first for navigation, Cache-first for static assets
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only intercept GET requests from the same origin
  if (request.method !== "GET" || !request.url.startsWith(self.location.origin)) {
    return;
  }

  // Navigation requests (HTML pages)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          const offlinePage = await caches.match("/404.html");
          return offlinePage || new Response("Offline - Page Not Found", {
            status: 404,
            headers: { "Content-Type": "text/html; charset=utf-8" }
          });
        })
    );
    return;
  }

  // Static Assets (Fonts, Styles, Scripts, Images, Manifest)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
          return networkResponse;
        }

        const clone = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, clone);
        });

        return networkResponse;
      });
    })
  );
});
