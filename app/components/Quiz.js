import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity
} from 'react-native'
import { 
  red, 
  green,
  white,
  black 
} from '../utils/colors'
import { 
  clearNotification, 
  getDeck 
} from '../utils/helpers'

class Quiz extends Component {
  componentDidMount() {
    const { params } = this.props.navigation.state;

    clearNotification()
    
    //Set the deck
    getDeck(params.title)
    .then((deck) => {
      this.setState({
        deck: deck
      })
    })
  }
  state = {
    currentQuestionNumber: 0,
    showQuestion: true,
    correctCount: 0,
    showResults: false,
    deck: null
  }
  handlePressCorrect() {
    const { deck } = this.state
    const { currentQuestionNumber, correctCount } = this.state

    this.setState({
      correctCount: correctCount + 1,
      currentQuestionNumber: currentQuestionNumber + 1
    })

    if (currentQuestionNumber === (deck.questions.length - 1)) {
      this.setState({
        showResults: true
      })
    }
  }
  handlePressIncorrect() {
    const { deck } = this.state
    const { currentQuestionNumber } = this.state

    this.setState({
      currentQuestionNumber: currentQuestionNumber + 1
    })

    if (currentQuestionNumber === (deck.questions.length - 1)) {
      this.setState({
        showResults: true
      })
    }
  }
  handlePressRestart() {
    this.setState({
      currentQuestionNumber: 0, 
      showQuestion: true, 
      correctCount: 0,
      showResults: false 
    })
  }
  render() {
    const { deck } = this.state
    const { 
      currentQuestionNumber, 
      showQuestion, 
      correctCount,
      showResults 
    } = this.state

    return (
      deck
        ?<View style={styles.container}>
          {showResults
            ?<View style={styles.resultsContainer}>
              <View>
                <Text style={styles.resultsText}>
                  Final score: {Math.round((correctCount/deck.questions.length)*100)}%
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => this.handlePressRestart()}
                  style={[styles.button, styles.blackButton]}>
                  <Text style={styles.whiteText}>Restart Quiz</Text>
                </TouchableOpacity>
              </View>
            </View>
            :<View>
              <View style={styles.cardCounterContainer}>
                <Text>{currentQuestionNumber + 1}/{deck.questions.length}</Text>
              </View>
              <View style={styles.mainContentContainer}>
                <View style={styles.questionContainer}>
                  <Text style={styles.questionText}>
                    {showQuestion
                      ? deck.questions[currentQuestionNumber].question
                      : deck.questions[currentQuestionNumber].answer
                    }
                  </Text>
                </View>
                {showQuestion
                  ? <View>
                      <View style={styles.answerButtonContainer}>
                        <TouchableOpacity
                          onPress={() => this.setState({ showQuestion: false })}>
                          <Text style={styles.answerButton}>Answer</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  : <View style={styles.questionButtonContainer}>
                      <TouchableOpacity
                        onPress={() => this.setState({ showQuestion: true })}>
                        <Text style={styles.questionButton}>Question</Text>
                      </TouchableOpacity>
                  </View>
                }
                <View>
                  <TouchableOpacity 
                    style={[styles.button,styles.greenButton]}
                    onPress={() => this.handlePressCorrect()}>
                    <Text style={styles.whiteText}>Correct</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity 
                  style={[styles.button,styles.redButton]}
                  onPress={() => this.handlePressIncorrect()}>
                    <Text style={styles.whiteText}>Incorrect</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
        </View>
        : null
    )
  }
}

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
    fontWeight: '900',
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
    fontWeight: '900',
    fontSize: 40
  },
  answerButton: {
    fontWeight: '900',
    color: red
  },
  questionButton: {
    fontWeight: '900',
    color: red
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
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 60,
    paddingRight: 60
  },
  greenButton: {
    backgroundColor: green
  },
  redButton: {
    backgroundColor: red
  },
  blackButton: {
    backgroundColor: black
  }
})

export default Quiz