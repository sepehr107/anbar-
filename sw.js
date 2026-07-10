// ============================================================
// Service Worker — مدیریت ساختمان سپهر
// ============================================================
const CACHE_NAME = 'sepehr-v1.0.1';
const OFFLINE_URL = './index.html';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  // Google Fonts — cache on first fetch
  'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap'
];

// ---- INSTALL: pre-cache all assets ----
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Pre-caching assets');
        // Cache local assets reliably; fonts may fail on first install (that's OK)
        return cache.addAll(
          ASSETS_TO_CACHE.filter(u => !u.startsWith('https://fonts.'))
        ).then(() =>
          cache.addAll(
            ASSETS_TO_CACHE.filter(u => u.startsWith('https://fonts.'))
          ).catch(() => console.log('[SW] Font cache skipped (offline install)'))
        );
      })
      .then(() => self.skipWaiting())
  );
});

// ---- ACTIVATE: clean up old caches ----
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => {
            console.log('[SW] Deleting old cache:', k);
            return caches.delete(k);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// ---- FETCH: Cache-First for local, Network-First for remote ----
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip non-GET and chrome-extension requests
  if (event.request.method !== 'GET') return;
  if (url.protocol === 'chrome-extension:') return;

  // For Google Fonts / CDN: stale-while-revalidate
  if (url.hostname.includes('fonts.') || url.hostname.includes('googleapis.')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cached => {
          const network = fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          }).catch(() => cached);
          return cached || network;
        })
      )
    );
    return;
  }

  // For local app files: Cache-First, fallback to network, fallback to index.html
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          // Cache successful responses
          if (response && response.status === 200 && response.type !== 'opaque') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Offline fallback → serve index.html
          if (event.request.mode === 'navigate') {
            return caches.match(OFFLINE_URL);
          }
        });
    })
  );
});

// ---- BACKGROUND SYNC (for future payment sync) ----
self.addEventListener('sync', event => {
  if (event.tag === 'sync-payments') {
    console.log('[SW] Background sync triggered');
  }
});

// ---- PUSH NOTIFICATIONS (for debt reminders) ----
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'مدیریت ساختمان سپهر', {
      body: data.body || 'یک واحد بدهکار دارید',
      icon: './icons/icon-192.png',
      badge: './icons/icon-96.png',
      dir: 'rtl',
      lang: 'fa',
      vibrate: [100, 50, 100],
      data: { url: data.url || './' }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || './')
  );
});
