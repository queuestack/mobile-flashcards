import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  Animated
} from 'react-native'
import { black, white } from './../utils/colors'
import {
  getDeck
} from '../utils/helpers'

class Deck extends Component {
  state = {
    deck: null,
    titleAnim: new Animated.Value(0)
  }
  componentDidMount() {
    //Grab the navigation param
    const { params } = this.props.navigation.state;

    //Set the deck
    getDeck(params.title)
      .then((deck) => {
        this.setState({
          deck: deck
        })
      })
  }
  handleOnAddCardPress() {
    const { navigation } = this.props

    const { params } = this.props.navigation.state;

    //Navigate to the add card view
    navigation.navigate('AddCard', { 
      title: params.title,
      refreshDeck: params.refreshDeck
    })
  }
  handleQuizPress() {
    const { navigation } = this.props
    const { deck } = this.state
    const { params } = this.props.navigation.state;

    if (deck.questions.length === 0 ) {
      return
    }

    //Navigate to the quiz view
    navigation.navigate('Quiz', { 
      title: params.title
    })
  }
  render(){
    const { deck, titleAnim } = this.state

    //Grow the deck title
    Animated.timing(
      titleAnim,
      {
        toValue: 40,
        duration: 500
      }
    ).start()

    return (
      deck
      ? <View style={styles.container}>
          <Animated.Text style={[styles.deckTitle, { fontSize: titleAnim }]}>{ deck.title }</Animated.Text>
          <Text style={styles.cardNumber}>
            {
              deck.questions.length === 1
                ? deck.questions.length + ' card'
                : deck.questions.length + ' cards'
            }
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={() => this.handleOnAddCardPress()}
              style={styles.button}>
              <Text style={styles.buttonText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => this.handleQuizPress()}
              style={[styles.button, styles.startQuizButton]}>
              <Text style={[styles.buttonText, styles.startQuizButtonText]}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      : <View />
    )
  }
}

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

export default Deck