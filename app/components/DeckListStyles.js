import { StyleSheet } from 'react-native'
import { black } from '../utils/colors'

const styles = StyleSheet.create({
	deck: {
		padding: 40
	},
	deckTitle: {
		fontWeight: '100',
		fontSize: 20,
		textAlign: 'center'
	},
	cardNumber: {
		textAlign: 'center'
	},
	bottomBorder: {
		borderBottomColor: black,
		borderBottomWidth: 1		
	}
});

export default styles