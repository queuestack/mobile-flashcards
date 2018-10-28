import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';
import { 
  black, 
  white 
} from '../utils/colors'
import {
  getDeck,
  addCardToDeck
} from '../utils/helpers'
import { 
  StackActions, 
  NavigationActions 
} from 'react-navigation';

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    deck: null
  }
  componentDidMount() {
    const { params } = this.props.navigation.state;

    //Set the deck
    getDeck(params.title)
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

    //If either question or answer are empty, stop
    if (question.length === 0 || answer.length === 0) {
      return
    }

    //Add the card to the deck
    addCardToDeck(deck.title, { question: question, answer: answer })
      .then(() => {
        //Reset the question and answer field
        this.setState({
          question: '',
          answer: ''
        })

        //Refresh the list of decks
        params.refreshDeck()

        //Return to the deck view
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
            style={ Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid } />
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
            style={ Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid } />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontWeight: '900',
    fontSize: 40
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
  blackButton: {
    backgroundColor: black
  },
  whiteText: {
    color: white
  },
  textInputContainer: {
    borderColor: black,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    margin: 20,
    padding: 5,
    flexDirection: 'row'
  },
  textInputIOS: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: black,
    flex: 1
  },
  textInputAndroid: {
    flex: 1,
  }
})

export default AddCard