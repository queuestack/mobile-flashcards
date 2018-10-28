import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import { getDeck } from '../utils/api'
import { clearNotification } from '../utils/helpers'

import styles from './QuizStyles'

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

    if (currentQuestionNumber === (deck.cards.length - 1)) {
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

    if (currentQuestionNumber === (deck.cards.length - 1)) {
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

    return (
      deck
        ? this.renderDeck()
        : null
    )
  }  
  renderDeck = () => {
    const { showResults } = this.state

    return (
      <View style={styles.container}>
        {showResults
          ? this.renderResult()
          : this.renderCards()
        }
      </View>
    )
  }
  renderResult = () => {
    const { deck, correctCount } = this.state
    const score = Math.round((correctCount/deck.cards.length)*100)

    return (
      <View style={styles.resultsContainer}>
        <View>
          <Text style={styles.resultsText}>
            Final score: {score}%
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
    )
  }
  renderCards = () => {
    const { deck, currentQuestionNumber, showQuestion } = this.state

    return (
      <View>
        <View style={styles.cardCounterContainer}>
          <Text>{currentQuestionNumber + 1}/{deck.cards.length}</Text>
        </View>
        <View style={styles.mainContentContainer}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {showQuestion
                ? deck.cards[currentQuestionNumber].question
                : deck.cards[currentQuestionNumber].answer
              }
            </Text>
          </View>
          {showQuestion
            ? this.renderQuestion()
            : this.renderAnswer()
          }
          <View>
            <TouchableOpacity 
              style={[styles.button,styles.blueButton]}
              onPress={() => this.handlePressCorrect()}>
              <Text style={styles.whiteText}> Correct </Text>
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
    )
  }
  renderQuestion = () => {
    return (
      <View>
        <View style={styles.answerButtonContainer}>
          <TouchableOpacity
            onPress={() => this.setState({ showQuestion: false })}>
            <Text style={styles.answerButton}>Show Answer</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  renderAnswer = () => {
    return (
      <View style={styles.questionButtonContainer}>
        <TouchableOpacity
          onPress={() => this.setState({ showQuestion: true })}>
          <Text style={styles.questionButton}>Show Question</Text>
        </TouchableOpacity>
      </View>        
    )
  }
}

export default Quiz