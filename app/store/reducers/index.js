import { ADD_CARD_TO_DECK, ADD_DECK, SEND_DECK_TO_STORAGE, GET_DECKS, SEND_CARD_TO_STORAGE } from '../constants'

const reducer = (state = {decks: {}}, action) => {
	switch(action.type) {
		case GET_DECKS:
			return {
				...state,
				decks: action.decks
			}

		case ADD_DECK:
			return {
				decks: {
					...state.decks,
					[action.deck]: {
						title: action.deck,
						questions: [],
					},
				},
			}

		case SEND_DECK_TO_STORAGE:
			return state

		case ADD_CARD_TO_DECK:
			let questions = state.decks[action.deck].questions

			questions.push({
				question: action.question,
				answer: action.answer
			})

			return {
				decks: {
					...state.decks,
					[action.deck]: {
						title: action.deck,
						questions,
					},
				},
			}

		case SEND_CARD_TO_STORAGE:
			return state

		default:
			return state
	}
}

export default reducer