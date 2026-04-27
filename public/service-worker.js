// Custom service worker for healthcare SaaS
// Handles push notifications and offline caching

const CACHE_NAME = 'healthcare-saas-v1';
const PRECACHE_URLS = ['/', '/index.html', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Listen for messages from the app (custom notifications)
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SHOW_NOTIFICATION') {
    const { title, body, tag, icon } = event.data.payload;
    self.registration.showNotification(title, {
      body,
      tag: tag ?? 'healthcare-notification',
      icon: icon ?? '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      vibrate: [200, 100, 200],
      requireInteraction: false,
      data: { url: '/' },
    });
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data?.url ?? '/';
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      const existing = clients.find((c) => c.url.includes(url));
      if (existing) return existing.focus();
      return self.clients.openWindow(url);
    })
  );
});

// Handle push events (for future server-sent push)
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  event.waitUntil(
    self.registration.showNotification(data.title ?? 'Healthcare SaaS', {
      body: data.body ?? 'You have a new update',
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      data: data.data ?? { url: '/' },
    })
  );
});