import { initDecks, getDecks, addDeckTitle, addCardToDeck  } from '../../utils/api'
import { ADD_CARD_TO_DECK, ADD_DECK, SEND_DECK_TO_STORAGE, GET_DECKS, SEND_CARD_TO_STORAGE } from '../constants'

export const getDecks = (decks) => {
	return {
		type: GET_DECKS,
		decks,
	}
}

export const getDecksFromStoraget = () => dispatch => (
	initDecks()
		.then(() => {
			getDecks()
				.then((results) => {
					dispatch(getDecks(JSON.parse(results)))
				})
		})
)

export const addDeck = (deck) => {
	return {
		type: ADD_DECK,
		deck
	}
}

export const sendDeckToStorage = (deck) => {
	return {
		type: SEND_DECK_TO_STORAGE,
		deck
	}
}

export const addDeckToStorage = (deck) => dispatch => {
	addDeckTitle(deck)
}

export const addCardToDeck = (title, question, answer) => {
	return {
		type: ADD_CARD_TO_DECK,
		deck: title,
		question,
		answer
	}
}

export const sendCardToStorage = (card) => {
	return {
		type: SEND_CARD_TO_STORAGE,
		card,
	}
}

export const addCardToStorage = (title, question, answer) => dispatch => {
	addCardToDeck(title, question, answer)
}