self.addEventListener('push', event => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: 'https://livecovid.in/logo192x192.png',
    badge: 'https://livecovid.in/logo192x192.png',
    renotify: true,
    tag: 'livecovid-new-cases'
  }
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
})

self.onnotificationclick = function (event) {
  event.notification.close();
  const urlToOpen = new URL("", self.location.origin).href;
  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  })
    .then((windowClients) => {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url === urlToOpen) {
          matchingClient = windowClient;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });
  event.waitUntil(promiseChain);
};