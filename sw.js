/* Αποθηκεύει την εφαρμογή στο κινητό ώστε να δουλεύει χωρίς σήμα.
   Όταν αλλάζετε κάτι, ανεβάστε την έκδοση (VERSION) για να ενημερωθούν τα κινητά. */
const VERSION='deltio-ta-v1';
const FILES=[
  './',
  'fonts.css',
  'ibm-plex-mono-latin-500-normal.woff2',
  'ibm-plex-sans-greek-400-normal.woff2',
  'ibm-plex-sans-greek-500-normal.woff2',
  'ibm-plex-sans-greek-600-normal.woff2',
  'ibm-plex-sans-greek-700-normal.woff2',
  'ibm-plex-sans-latin-400-normal.woff2',
  'ibm-plex-sans-latin-500-normal.woff2',
  'ibm-plex-sans-latin-600-normal.woff2',
  'ibm-plex-sans-latin-700-normal.woff2',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'maskable-512.png',
  'index.html',
  'html2canvas.min.js',
  'jspdf.umd.min.js',
  'manifest.webmanifest',
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('deltio-ta-v')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const isPage=e.request.mode==='navigate';
  e.respondWith(isPage
    /* σελίδα: πρώτα από το δίκτυο (για ενημερώσεις), αλλιώς από το κινητό */
    ? fetch(e.request).then(r=>{const cp=r.clone();caches.open(VERSION).then(c=>c.put('./',cp));return r}).catch(()=>caches.match('./'))
    : caches.match(e.request).then(r=>r||fetch(e.request)));
});
