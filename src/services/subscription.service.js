import { idb } from "./idb.service";
import axios from "axios";

const convertedVapidKey = urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY)

function urlBase64ToUint8Array(base64String) {
  console.log(base64String);
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const postRequest = (url, data) => {
  return axios.post(url, data);
}

function sendSubscription(data) {
  return postRequest(`${process.env.REACT_APP_API_URL}/notifications/subscribe`, data).then((response) => {
      console.log(response);
      if (response.status === 200 && response.data.success === true) {
        const districtState = {
          alarmStatus: true,
        };
        idb.set(data.payload.key, districtState);
      } else {
        // show error that we were not able save the subscription details, try again
      }
    }).catch(err => {
      // Show an error;
    })
}

const sendUnsubscription = (data) => {
  return postRequest(`${process.env.REACT_APP_API_URL}/notifications/unsubscribe`, data).then((response) => {
    console.log(response);
    if (response.status === 200 && response.data.success === true ) {
      // Data successfully updated in the database
      idb.delete(data.payload.key);
    } else {
      // show error that we were not able save the subscription details, try again
    }
  }).catch(err => {
    // show an error
  })
}

export function subscribeUser(key, status) {

  // The user wants to subscribe to a new notification channel (district)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (registration) {
      if (!registration.pushManager) {
        console.log('Push manager unavailable.')
        return
      }
      registration.pushManager.getSubscription().then(function (existingSubscription) {
        if (existingSubscription === null) {
          console.log('No subscription detected, make a request.');
          registration.pushManager.subscribe({
            applicationServerKey: convertedVapidKey,
            userVisibleOnly: true,
          }).then(function (newSubscription) {
            console.log('New subscription added.', newSubscription);
            sendSubscription({
              subscription: newSubscription,
              payload: {
                key
              }
            });
          }).catch(function (e) {
            if (Notification.permission !== 'granted') {
              console.log('Permission was not granted.')
              // Show a pop-up that we need notification access.
            } else {
              console.error('An error ocurred during the subscription process.', e)
              // Show a pop-up that there was an internal error.
            }
          })
        } else {
          console.log('Existing subscription detected.')
          const data = {
            subscription: existingSubscription,
            payload: {
              key
            }
          };
          if (status) {
            sendSubscription(data);
          } else {
            sendUnsubscription(data);
          }
        }
      })
    })
      .catch(function (e) {
        console.error('An error ocurred during Service Worker registration.', e)
      })
  }
}