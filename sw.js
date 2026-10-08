const CACHE_NAME = 'word-app-v16'
const FILES = ['./', './index.html', './manifest.json', './tetsuheki-icon-192.png', './tetsuheki-icon-512.png', './words.js']
self.addEventListener('install', (event) => {
    self.skipWaiting()
    event.waitUntil(caches.open(CACHE_NAME).then((cache) =>
    cache.addAll(FILES.map((file) => new Request(file, { cache: 'reload' })))))
})
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) => Promise.all(
            names.filter((name) => name !== CACHE_NAME)
                .map((name) => caches.delete(name))
        ))
    )
     self.clients.claim()
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request). then((cached) => cached ||
fetch(event.request))
    )
})