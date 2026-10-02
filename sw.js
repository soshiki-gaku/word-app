const CACHE_NAME = 'word-app-v2'
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './words.js']
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) =>
    cache.addAll(FILES)))
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request). then((cached) => cached ||
fetch(event.request))
    )
})