const CACHE_NAME = 'word-app-v6'
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './words.js']
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) =>
    cache.addAll(FILES)))
})
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((names) => Promise.all(
            names.filter((name) => name !== CACHE_NAME)
                .map((name) => caches.delete(name))
        ))
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request). then((cached) => cached ||
fetch(event.request))
    )
})