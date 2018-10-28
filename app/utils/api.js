import { AsyncStorage } from 'react-native'

const DECKS_KEY = 'DECKS_KEY'

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