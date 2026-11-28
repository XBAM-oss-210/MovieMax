// Service worker minimal : aucun cache, donc les mises à jour sont toujours immédiates
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
            .then(() => self.clients.claim()),
    );
});

// Sans respondWith, le navigateur gère le réseau normalement
self.addEventListener("fetch", () => {});