self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",event=>event.waitUntil(self.clients.claim()));
// Intentionally no caching yet: requests continue to use the network so deploys never serve stale pages.
self.addEventListener("fetch",()=>{});
