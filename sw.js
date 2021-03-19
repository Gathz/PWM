const APP_PREFIX = 'PWM'
const VERSION = '0.0.0.1'
const CACHE_NAME = APP_PREFIX + VERSION
const URLS = [
  '/',
  '/index.html',
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
  '/assets/frontend.min.css',
  '/assets/js/frontend.min.js',
  '/manifest.json',
  '/assets/images/icons/icon-32x32.png',
  '/assets/images/icons/icon-76x76.png',
  '/assets/images/icons/icon-120x120.png',
  '/assets/images/icons/icon-152x152.png',
  '/assets/images/icons/icon-167x167.png',
  '/assets/images/icons/icon-180x180.png',
  '/assets/images/icons/icon-192x192.png',
  '/assets/images/icons/icon-196x196.png',
  '/sw.js',
]
self.addEventListener('install', e => e.waitUntil(swInstall()))
self.addEventListener('activate', e => e.waitUntil(swActivate()))
self.addEventListener('fetch', e => e.respondWith(swFetch(e)))


async function swFetch(e) {
  console.log('sw[fetch]')
  let request = await caches.match(e.request);
  return request || fetchAndCache(e.request);
}


async function swInstall() {
  console.log('sw[install]')
  const cache = await caches.open(CACHE_NAME);
  let options = { headers: { 'cache-control': 'no-cache' }};
  let requests = URLS.map(url => new Request(url, options))
  await cache.addAll(requests);
  await self.skipWaiting();
}


async function swActivate() {
  console.log('sw[activate]')
  let keyList = await caches.keys();
  let cacheWhitelist = keyList.filter(key => key.indexOf(APP_PREFIX));
  cacheWhitelist.push(CACHE_NAME)
  return Promise.all(keyList.map(function (key, i) {
    if (cacheWhitelist.indexOf(key) === -1) {
      console.log('deleting cache : ' + keyList[i])
      return caches.delete(keyList[i])
    }
  }))
}


async function fetchAndCache(request){
  const res = await fetch(request);
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, res.clone());
  return res;
}
