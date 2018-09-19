var cacheName = 'my-pwa-cache-v1';

var filesToCache = [
    '/',
    '/public/css/bulma.min.css',
    '/public/js/jquery.min.js'
];


//register cache file (main file ..!!!!!)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            return cache.addAll(filesToCache);
        }).catch(error => {
            console.log(error);
        })
    );
});

//try to delete if cache not current name
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(function(_cacheName) {
                    return _cacheName != cacheName;
                }).map(cacheName => {
                    return caches.delete(cacheName);
                })
            )
        })
    )
});

//fetch from catch if filestocache ready in cachestorage
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) return response;

            var fetchRequest = event.request.clone();

            return fetch(fetchRequest)
            .then(response => {
                if(!response) return response;
                
                var responseToCache = response.clone();

                caches.open(cacheName)
                    .then(cache => {
                        cache.put(event.request, responseToCache);
                    });

                return response;
            })
        })
    )
})