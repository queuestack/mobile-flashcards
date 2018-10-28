import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

import { getDeck, addCardToDeck } from '../utils/api'
import { StackActions, NavigationActions } from 'react-navigation';

import styles from './AddCardStyles'

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    deck: null
  }
  componentDidMount() {
    const { title } = this.props.navigation.state.params;

    getDeck(title)
      .then((deck) => {
        this.setState({
          deck
        })
      })
  }
  handleQuestionText = (question) => {
    this.setState({
      question
    })
  }
  handleAnswerText = (answer) => {
    this.setState({
      answer
    })
  }
  handleSubmit = () => {
    const { question, answer, deck } = this.state
    const { navigation } = this.props
    const { updateDeck } = this.props.navigation.state.params;

    if (question.length === 0 || answer.length === 0) {
      return
    }
    const card = { question, answer }
    addCardToDeck(deck.title, card)
      .then(() => {
        this.setState({
          question: '',
          answer: ''
        })

        updateDeck()

        navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })]
        }))
      })
  }
  renderAddCard() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            Question
          </Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput 
            onChangeText={this.handleQuestionText}
            placeholder="Type question"
            value={this.state.question}
            style={styles.textInput} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Answer
          </Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput 
            onChangeText={this.handleAnswerText}
            placeholder="Type answer"
            value={this.state.answer}
            style={styles.textInput} />
        </View>
        <View>
          <TouchableOpacity 
            style={[styles.button, styles.blackButton]}
            onPress={this.handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>      
    )  
  }
  render() {
    const { deck } = this.state

    return (
      deck
      ? this.renderAddCard()
      : <View />
    )
  }
}

export default AddCard