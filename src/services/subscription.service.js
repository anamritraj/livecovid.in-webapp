import axios from 'axios'
import { idb } from './idb.service'

const convertedVapidKey = urlBase64ToUint8Array(
  process.env.REACT_APP_PUBLIC_VAPID_KEY
)

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const askUserPermissions = () =>
  new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (!registration.pushManager) {
          console.log('Push manager unavailable.')
          reject({
            msg: 'browser_unsupported',
          })
        }
        const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey,
        }

        registration.pushManager
          .subscribe(subscribeOptions)
          .then((existingSubscription) => {
            console.log(existingSubscription)
            resolve({
              msg: 'success',
            })
          })
          .catch((e) => {
            if (Notification.permission !== 'granted') {
              console.log('Permission was not granted.')
              // Show a pop-up that we need notification access.
              reject({
                msg: 'blocked',
              })
            } else {
              console.error('An error ocurred during the subscription process.', e)
              // Show a pop-up that there was an internal error.
              reject({
                msg: 'error',
              })
            }
          })
      })
    } else {
      reject({
        msg: 'browser_unsupported',
      })
    }
  })

const postRequest = (url, data) => axios.post(url, data)

function sendSubscription(data) {
  return postRequest(
    `${process.env.REACT_APP_API_URL}/notifications/subscribe`,
    data
  )
}

const sendUnsubscription = (data) =>
  postRequest(`${process.env.REACT_APP_API_URL}/notifications/unsubscribe`, data)

function subscribeUser(key, status) {
  // The user wants to subscribe to a new notification channel (district)
  return new Promise((resolve, reject) => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          if (!registration.pushManager) {
            console.log('Push manager unavailable.')
            return
          }
          registration.pushManager.getSubscription().then((existingSubscription) => {
            if (existingSubscription === null) {
              console.log('No subscription detected, make a request.')
              reject({
                code: 'no_permission',
              })
            } else {
              const data = {
                subscription: existingSubscription,
                payload: {
                  key,
                },
              }
              if (status) {
                sendSubscription(data)
                  .then((response) => {
                    if (response.status === 200 && response.data.success === true) {
                      const districtState = {
                        alarmStatus: true,
                      }
                      idb.set(data.payload.key, districtState)
                      resolve({ msg_code: 'success' })
                    } else {
                      reject({ msg_code: 'failure' })
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                    reject({ msg_code: 'server_error' })
                  })
              } else {
                sendUnsubscription(data)
                  .then((response) => {
                    if (response.status === 200 && response.data.success === true) {
                      // Data successfully updated in the database
                      idb.delete(data.payload.key)
                      resolve({ msg_code: 'success' })
                    } else {
                      reject({ msg_code: 'failure' })
                    }
                  })
                  .catch((err) => {
                    console.log(err)
                    reject({ msg_code: 'server_error' })
                  })
              }
            }
          })
        })
        .catch((e) => {
          console.error('An error ocurred during Service Worker registration.', e)
        })
    } else {
      reject({
        msg: 'browser_unsupported',
      })
    }
  })
}

export { askUserPermissions, subscribeUser }
