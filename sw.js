const cacheName = 'PWM-v1';
const staticAssets = [
  './',
  './index.html',
  './assets/fonts/frontend/Quicksand-Bold.ttf',
  './assets/fonts/frontend/Quicksand-Bold.woff',
  './assets/fonts/frontend/Quicksand-Bold.woff2',
  './assets/fonts/frontend/Quicksand-Light.ttf',
  './assets/fonts/frontend/Quicksand-Light.woff',
  './assets/fonts/frontend/Quicksand-Light.woff2',
  './assets/fonts/frontend/Quicksand-Medium.ttf',
  './assets/fonts/frontend/Quicksand-Medium.woff',
  './assets/fonts/frontend/Quicksand-Medium.woff2',
  './assets/fonts/frontend/Quicksand-Regular.ttf',
  './assets/fonts/frontend/Quicksand-Regular.woff',
  './assets/fonts/frontend/Quicksand-Regular.woff2',
  './assets/fonts/frontend/Quicksand-SemiBold.ttf',
  './assets/fonts/frontend/Quicksand-SemiBold.woff',
  './assets/fonts/frontend/Quicksand-SemiBold.woff2',
  './assets/frontend.min.css',
  './assets/js/frontend.min.js',
  './manifest.json',
  './assets/images/icons/icon-32x32.png',
  './assets/images/icons/icon-76x76.png',
  './assets/images/icons/icon-120x120.png',
  './assets/images/icons/icon-152x152.png',
  './assets/images/icons/icon-167x167.png',
  './assets/images/icons/icon-180x180.png',
  './assets/images/icons/icon-192x192.png',
  './assets/images/icons/icon-196x196.png',
  './assets/images/icons/icon-512x512.png',
  './sw.js'
];

self.addEventListener('install', async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', e => {
  self.clients.claim();
});

self.addEventListener('fetch', async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
