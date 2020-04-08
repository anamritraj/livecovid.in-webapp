// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 are considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);
let db;
// Let us open our database
const DBOpenRequest = window.indexedDB.open("keyval-store", 1);

// these two event handlers act on the database being opened successfully, or not
DBOpenRequest.onerror = function(event) {
  console.log("Error loading database");
};

DBOpenRequest.onsuccess = function(event) {
  console.log("Database initialized..");
  // store the result of opening the database in the db variable. This is used a lot below
  db = DBOpenRequest.result;
};

const showNotificationsBasedOnData = districtData => {
  let districtNameArray = [];

  let objectStore = db.transaction("keyval", "readwrite").objectStore("keyval");
  objectStore.openCursor().onsuccess = function(event) {
    let cursor = event.target.result;
    // if there is still another cursor to go, keep runing this code
    if (cursor) {
      const stateKey = cursor.key.split("_")[0];
      const districtName = cursor.key.split("_")[1];
      const numberOfPatients = cursor.value.numberOfPatients || 0;
      console.log(
        stateKey,
        numberOfPatients,
        districtData[stateKey].districts[districtName].confirmed
      );
      if (
        districtData[stateKey].districts[districtName].confirmed >
        numberOfPatients
      ) {
        districtNameArray.push(districtName);
        try {
          let objectStoreRequest = objectStore.put(
            {
              ...cursor.value,
              numberOfPatients:
                districtData[stateKey].districts[districtName].confirmed
            },
            stateKey + "_" + districtName
          );

          objectStoreRequest.onsuccess = function() {
            console.log("This has been udpated in the database");
          };
          objectStoreRequest.onerror = function(e) {
            console.log("This has not been udpated in the database", e);
          };
        } catch (e) {
          console.log(e);
        }
      }

      cursor.continue();
    } else {
      if (districtNameArray.length) {
        const notification = new Notification("There are new Cases!", {
          body: "There are new cases in " + districtNameArray.join(", "),
          tag: "districtNotification",
          image: "./assets/logo192x192.png",
          renotify: true,
          requireInteraction: true
        });

        notification.onclick = function(event) {
          event.preventDefault(); // prevent the browser from focusing the Notification's tab
          window.open(window.location + "?ref=notification", "_blank");
        };
      }
    }
  };
};

const startCasesNotificationService = () => {
  fetch("http://localhost:4444/api/district").then(response => {
    if (response.status !== 200) {
      console.log(
        "Looks like there was a problem. Status Code: " + response.status
      );
      return;
    }
    response.json().then(function(data) {
      showNotificationsBasedOnData(data);
    });
  });
};

export function register(config) {
  
  if ("serviceWorker" in navigator) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener("load", () => {
      const swFileName = process.env.NODE_ENV === 'production'
        ? 'service-worker.js'
        : 'custom-sw.js'
      const swUrl = `${process.env.PUBLIC_URL}/${swFileName}`;

      if (isLocalhost) {
        // This is running on localhost. Let's check if a service worker still exists or not.
        checkValidServiceWorker(swUrl, config);

        // Add some additional logging to localhost, pointing developers to the
        // service worker/PWA documentation.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "This web app is being served cache-first by a service " +
              "worker. To learn more, visit https://bit.ly/CRA-PWA"
          );

          if (
            Notification.permission === "denied" ||
            Notification.permission === "default"
          ) {
            console.log("There is no notification access, abort!");
          } else {
            setInterval(startCasesNotificationService, 10000);
          }
          Notification.requestPermission().then(permission => {
            console.log(permission);
          });
        });
      } else {
        // Is not localhost. Just register service worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // At this point, the updated precached content has been fetched,
              // but the previous service worker will still serve the older
              // content until all client tabs are closed.
              console.log(
                "New content is available and will be used when all " +
                  "tabs for this page are closed. See https://bit.ly/CRA-PWA."
              );

              // Execute callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a
              // "Content is cached for offline use." message.
              console.log("Content is cached for offline use.");

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error("Error during service worker registration:", error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Check if the service worker can be found. If it can't reload the page.
  fetch(swUrl, {
    headers: { "Service-Worker": "script" }
  })
    .then(response => {
      // Ensure service worker exists, and that we really are getting a JS file.
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // No service worker found. Probably a different app. Reload the page.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker found. Proceed as normal.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}
