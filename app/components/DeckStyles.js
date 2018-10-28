import { StyleSheet } from 'react-native'
import { black, white } from './../utils/colors'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	deckTitle: {
		fontWeight: '900',
		textAlign: 'center',
		marginBottom: 20
	},
	cardNumber: {
		textAlign: 'center',
		marginBottom: 40
	},
	buttonText: {
		textAlign: 'center'
	},
	button: {
		borderColor: black,
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 10,
		margin: 5,
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 60,
		paddingRight: 60
	},
	startQuizButton: {
		backgroundColor: black
	},
	startQuizButtonText: {
		color: white
	}
});

export default styles

