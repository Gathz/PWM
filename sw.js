// const cacheName = 'PWM-v1';
// const staticAssets = [
//   './',
//   './index.html',
//   './assets/fonts/frontend/Quicksand-Bold.ttf',
//   './assets/fonts/frontend/Quicksand-Bold.woff',
//   './assets/fonts/frontend/Quicksand-Bold.woff2',
//   './assets/fonts/frontend/Quicksand-Light.ttf',
//   './assets/fonts/frontend/Quicksand-Light.woff',
//   './assets/fonts/frontend/Quicksand-Light.woff2',
//   './assets/fonts/frontend/Quicksand-Medium.ttf',
//   './assets/fonts/frontend/Quicksand-Medium.woff',
//   './assets/fonts/frontend/Quicksand-Medium.woff2',
//   './assets/fonts/frontend/Quicksand-Regular.ttf',
//   './assets/fonts/frontend/Quicksand-Regular.woff',
//   './assets/fonts/frontend/Quicksand-Regular.woff2',
//   './assets/fonts/frontend/Quicksand-SemiBold.ttf',
//   './assets/fonts/frontend/Quicksand-SemiBold.woff',
//   './assets/fonts/frontend/Quicksand-SemiBold.woff2',
//   './assets/frontend.min.css',
//   './assets/js/frontend.min.js',
//   './manifest.json',
//   './assets/images/icons/icon-32x32.png',
//   './assets/images/icons/icon-76x76.png',
//   './assets/images/icons/icon-120x120.png',
//   './assets/images/icons/icon-152x152.png',
//   './assets/images/icons/icon-167x167.png',
//   './assets/images/icons/icon-180x180.png',
//   './assets/images/icons/icon-192x192.png',
//   './assets/images/icons/icon-196x196.png',
//   './assets/images/icons/icon-512x512.png',
//   './sw.js'
// ];
//
// self.addEventListener('install', async e => {
//   const cache = await caches.open(cacheName);
//   await cache.addAll(staticAssets);
//   return self.skipWaiting();
// });
//
// self.addEventListener('activate', e => {
//   self.clients.claim();
// });
//
// self.addEventListener('fetch', async e => {
//   const req = e.request;
//   const url = new URL(req.url);
//
//   if (url.origin === location.origin) {
//     e.respondWith(cacheFirst(req));
//   } else {
//     e.respondWith(networkAndCache(req));
//   }
// });
//
// async function cacheFirst(req) {
//   const cache = await caches.open(cacheName);
//   const cached = await cache.match(req);
//   return cached || fetch(req);
// }
//
// async function networkAndCache(req) {
//   const cache = await caches.open(cacheName);
//   try {
//     const fresh = await fetch(req);
//     await cache.put(req, fresh.clone());
//     return fresh;
//   } catch (e) {
//     const cached = await cache.match(req);
//     return cached;
//   }
// }

const cacheName = 'cache-v2';
const resourcesToPrecache = [
    '/',
    'index.html',
    '/assets/frontend.min.css',
    '/assets/js/frontend.min.js',
    '/assets/fonts/frontend/Quicksand-Bold.ttf',
    '/assets/fonts/frontend/Quicksand-Bold.woff',
    '/assets/fonts/frontend/Quicksand-Bold.woff2',
    '/assets/fonts/frontend/Quicksand-Light.ttf',
    '/assets/fonts/frontend/Quicksand-Light.woff',
    '/assets/fonts/frontend/Quicksand-Light.woff2',
    '/assets/fonts/frontend/Quicksand-Medium.ttf',
    '/assets/fonts/frontend/Quicksand-Medium.woff',
    '/assets/fonts/frontend/Quicksand-Medium.woff2',
    '/assets/fonts/frontend/Quicksand-Regular.ttf',
    '/assets/fonts/frontend/Quicksand-Regular.woff',
    '/assets/fonts/frontend/Quicksand-Regular.woff2',
    '/assets/fonts/frontend/Quicksand-SemiBold.ttf',
    '/assets/fonts/frontend/Quicksand-SemiBold.woff',
    '/assets/fonts/frontend/Quicksand-SemiBold.woff2',
    '/assets/images/icons/icon-32x32.png',
    '/assets/images/icons/icon-76x76.png',
    '/assets/images/icons/icon-120x120.png',
    '/assets/images/icons/icon-152x152.png',
    '/assets/images/icons/icon-167x167.png',
    '/assets/images/icons/icon-180x180.png',
    '/assets/images/icons/icon-192x192.png',
    '/assets/images/icons/icon-196x196.png',
    '/assets/images/icons/icon-512x512.png',
];

// Add element into cache
self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(resourcesToPrecache);
            })
    );
});

// Responding with only cached resources
self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            return cachedResponse || fetch(event.request);
        })
    );
});


//
// // Listen for beforeinstallprompt
// let deferredPrompt;
// // Notify the user to install
// window.addEventListener('beforeinstallprompt', (e) => {
//     // Prevent Chrome 67 and earlier from automatically showing the prompt
//     e.preventDefault();
//     // Stash the event so it can be triggered later
//     deferredPrompt = e;
//     // Update UI notify user thay can add to home screen
//     btnAdd.style.display = 'block';
// });
//
// // Show the prompt
// btnAdd.addEventListener('click', (e) => {
//     deferredPrompt.prompt();
//     deferredPrompt.userChoice.then((choiceResult) => {
//         if (coicheResult.outcome === 'accepted') {
//             console.log('User accepted the A2HS prompt');
//         }
//         deferredPrompt = null;
//     });
// });
//
// // Confirming installations
// window.addEventListener('appinstalled', (evt) => {
//     app.logEvent('a2hs', 'installed');
// });
