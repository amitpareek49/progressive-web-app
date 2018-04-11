self.addEventListener('install', function (event) {
  var cacheName = 'cricApp-v-0';

  var apiRequest = new Request('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5a1e3883c629428f86afbdd386446694');
  var fontRequest = new Request('https://fonts.googleapis.com/css?family=Roboto');
  var indexPage = new Request('index.html');

  var filesToCache = [
    '',
    '/',
    apiRequest,
    fontRequest,
	indexPage
  ];

  event.waitUntil(
    fetch(filesToCache).then(function(response) {
      return caches.open(cacheName).then(function(cache) {
        console.log('[PWA Builder] Cached index page during Install'+ response.url);
        return cache.addAll(filesToCache);
      });
  }));
  
  //event.waitUntil(
    ///caches.open(cacheName).then(function (cache) {
      //console.log('[ServiceWorker] Caching app shell');
      //return cache.addAll(filesToCache);
    //})
  //);
});

self.addEventListener('fetch', function (event) {
	console.log('Fetch Called', event.request.url);
	var updateCache = function(request){
    return caches.open(cacheName).then(function (cache) {
      return fetch(request).then(function (response) {
        console.log('[PWA Builder] add page to offline'+response.url)
        return cache.addAll(filesToCache);
      });
    });
  };

  event.waitUntil(updateCache(event.request));
  
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
})
