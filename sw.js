const cacheName = 'offline-stt'
const staticAssets = [
    './',
    './index.html',
    './index.js',
    'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.7.4',
    'https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands'

  ];

// FIrst event to be called by service worker to install the static assets
  self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
    return self.skipWaiting();
});

// When new service worker takes over previous service worker 
// Starts serving 
self.addEventListener('activate', e => {
    self.clients.claim();
});

// Listens for any fetch events 
// Handles fetch event and redirect to fetch from cache in the case of an offline request
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

    // Check our cached resources first
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);

    // If we cannot find cache resources, we fetch resource anyways
    return cached || fetch(req);
}
  
async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    
    try {
        // We attempt to refresh our cache 
        const fresh = await fetch(req);
        
        // If promise was resolved, we update our cache and return it  
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {

        // Fetch attempt did not resolve, so we match request with resource and return that instead 
        const cached = await cache.match(req);
        return cached;
    }
}