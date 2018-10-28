import { AsyncStorage } from 'react-native'

const DECKS_KEY = 'DECKS_KEY'

export function addCardToDeck( title, card ) {
    return AsyncStorage.getItem(DECKS_KEY)
      .then(JSON.parse)
      .then((decks) => {
        
        decks[title].questions.push(card)
  
        AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
      })
  }
  
  export function saveDeckTitle( title ) {
    return AsyncStorage.getItem(DECKS_KEY)
      .then(JSON.parse)
      .then((decks) => {
        if (!decks) { decks = {} }
  
        decks[title] = { title: title, questions: [] }
  
        return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
      })
  }
  
  export function getDeck( title ) {
    return AsyncStorage.getItem(DECKS_KEY)
      .then(JSON.parse)
      .then((decks) => {
        return decks[title]
      })
  }
  
  export function getDecks () {
    return AsyncStorage.getItem(DECKS_KEY)
      .then(JSON.parse)
      .then((decks) => {
        return decks
      })
  }