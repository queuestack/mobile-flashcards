import { AsyncStorage } from 'react-native'

let STORAGE_KEY = 'STORAGE_KEY'

export function initDecks() {
  const decks = {
    Korean: {
      title: 'Korean',
      questions: [
        { question: "What does '안녕 하세요' mean?", answer: "Hello" },
        { question: "What does '잘 가세요' mean?", answer: "Bye" },
        { question: "What does '감사합니다' mean?", answer: "Thank" },
      ]
    },
    English: {
      title: 'English',
      questions: [
        { question: "What does 'Hello' mean?", answer: "안녕 하세요" },
        { question: "What does 'Bye' mean?", answer: "잘 가세요" },
      ]
    }
  }
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(decks))
}

export function getDecks() {
  return AsyncStorage.getItem(STORAGE_KEY)
}

export function addDeckTitle(title) {
  AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]: {
      title: title,
      questions: [],
    },
  }))
}

export function addCardToDeck(title, card) {
  AsyncStorage.getItem(STORAGE_KEY)
  .then((result) => {
    let titles = JSON.parse(result)
    if (title in titles) {
      let cards = titles[title].questions
      cards.push(card)
      AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [title]: {
          title: [title],
          questions: cards
        }
      }))
    } else {
      AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [title]: {
          title: [title],
          questions: [{question: card.question, author: card.author}]
        }
      }))
    }
  })
}
