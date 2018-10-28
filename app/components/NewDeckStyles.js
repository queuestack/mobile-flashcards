import { StyleSheet } from 'react-native'
import { black, white } from '../utils/colors'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputContainer: {
    borderColor: black,
    borderRadius: 5,
    margin: 20,
    padding: 5,
    flexDirection: 'row'
  },
	textInput: {
		borderWidth: 1,
		borderColor: black,
		padding: 10,
		flex: 1
	},
  text: {
    fontWeight: '100',
    fontSize: 40,
    textAlign: 'center'
  },
  button: {
    borderColor: black,
    borderRadius: 10,
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
    paddingRight: 60
  },
  blackButton: {
    backgroundColor: black
  },
  whiteText: {
    color: white
  }
})

export default styles