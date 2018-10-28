import { AsyncStorage } from 'react-native'
import {
  Notifications,
  Permissions
} from 'expo'

const DECKS_KEY = 'MobileNotifications:decks'

export function addCardToDeck( title, card ) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(JSON.parse)
    .then((data) => {
      //Add the card to the deck
      data[title].questions.push(card)

      //Save the deck
      AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data))
    })
}

export function saveDeckTitle( title ) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(JSON.parse)
    .then((data) => {
      //Create an object if this is the first deck
      if (!data) { data = {} }

      //Create the deck
      data[title] = { title: title, questions: [] }

      //Save the updated deck
      return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data))
    })
}

export function getDeck(id) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(JSON.parse)
    .then((data) => {
      return data[id]
    })
}

export function getDecks () {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(JSON.parse)
    .then((data) => {
      return data
    })
}

const NOTIFICATIONS_KEY = 'MobileFlashcards:notifications'

export function setNotification() {
  AsyncStorage.getItem(NOTIFICATIONS_KEY)
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

              AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

function createNotification() {
  return {
    title: 'Study your flash cards',
    body: 'Don\'t forget to study today',
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

export function clearNotification() {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}