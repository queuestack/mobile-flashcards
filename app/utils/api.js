import { AsyncStorage } from 'react-native'

const DECKS_KEY = 'DECKS_KEY'

export function addCardToDeck( title, card ) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(data => JSON.parse(data))
    .then(decks => {
      decks[title].cards.push(card)

      AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
    })
}
  
export function saveDeckTitle( title ) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(JSON.parse)
    .then((decks) => {
      if (!decks) { decks = {} }

      decks[title] = { title: title, cards: [] }

      return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
    })
}

export function getDecks () {
  return AsyncStorage.getItem(DECKS_KEY)
    .then(data => JSON.parse(data))
}

export function getDeck( title ) {

  return getDecks()
    .then(decks => decks[title])
}