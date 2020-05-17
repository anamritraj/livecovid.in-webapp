import React, { useState } from 'react'
import notifications from '../data/NotificationsStore'
import useInterval from '../hooks/useInterval'

const Notification = () => {
  const [notificationIndex, setNoticationIndex] = useState(0)
  const [notification, setNotication] = useState(
    notifications[notificationIndex].message
  )

  useInterval(() => {
    let index = notificationIndex
    if (index + 1 === notifications.length) index = 0
    else index++
    setNotication(notifications[index].message)
    setNoticationIndex(index)
  }, 10000)

  return <div className="notification">{notification}</div>
}

export default Notification
