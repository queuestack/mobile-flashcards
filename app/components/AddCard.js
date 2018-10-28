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
          deck: deck
        })
      })
  }

  handleSubmit() {
    const { question, answer, deck } = this.state
    const { navigation } = this.props
    const { params } = this.props.navigation.state;

    if (question.length === 0 || answer.length === 0) {
      return
    }

    addCardToDeck(
        deck.title, 
        { question, answer }
    )
      .then(() => {
        this.setState({
          question: '',
          answer: ''
        })

        params.updateDeck()

        navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Home' })]
        }))
      })
  }

  render() {

    const { deck } = this.state

    return (
      deck
      ? <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            Question
          </Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput 
            onChangeText={(questionText) => this.setState({ question: questionText })}
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
            onChangeText={(answerText) => this.setState({ answer: answerText })}
            value={this.state.answer}
            style={styles.textInput} />
        </View>
        <View>
          <TouchableOpacity 
            style={[styles.button, styles.blackButton]}
            onPress={() => this.handleSubmit()}>
            <Text style={styles.whiteText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      : null
    )
  }
}

export default AddCard