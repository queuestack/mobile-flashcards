import { StyleSheet } from 'react-native'
import { red, green, white, black, blue } from '../utils/colors'

const styles = StyleSheet.create({
  container: {
		flex: 1
  },
  resultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    flex: 1
  },
  resultsText: {
    fontWeight: '100',
    fontSize: 40
  },
  mainContentContainer: {
    alignItems: 'center',
    marginTop: 200
  },
  cardCounterContainer: {
    margin: 10,
  },
  questionContainer: {
    margin: 10,
  },
  questionText: {
    fontWeight: '100',
    fontSize: 40
  },
  answerButton: {
    fontWeight: '900',
    color: red
  },
  questionButton: {
    fontWeight: '900',
    color: blue
  },
  answerButtonContainer: {
    marginBottom: 50,
    alignItems: 'center'
  },
  questionButtonContainer: {
    marginBottom: 50,
    alignItems: 'center'
  },
  whiteText: {
    color: white
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
  blueButton: {
		backgroundColor: blue
  },
  redButton: {
		backgroundColor: red
  },
  blackButton: {
    backgroundColor: black
  }
})

export default styles