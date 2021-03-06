import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTI_KEY = 'NOTI_KEY'

function createNotification() {
	return {
		title: 'Time to do flash cards',
		body: 'It is time to study!',
		ios: {
			sound: true
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: false,
			vibrate: true
		}
	}
}

export function setNotification() {
  AsyncStorage.getItem(NOTI_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        //Check for permission
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(( {status} ) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              //Set for 10:00AM
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(10)
              tomorrow.setMinutes(0)

              //Repeat daily
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )

              AsyncStorage.setItem(NOTI_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export function clearNotification() {
  return AsyncStorage.removeItem(NOTI_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}