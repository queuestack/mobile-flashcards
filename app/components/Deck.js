import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Animated } from 'react-native'
import { getDeck } from '../utils/api'
import styles from './DeckStyles'

class Deck extends Component {
  state = {
    deck: null,
    titleAnim: new Animated.Value(0)
  }
  initDeck(title) {
    getDeck(title)
      .then((deck) => {
        this.setState({
          deck: deck
        })
      })
  }
  componentDidMount() {
    const { title } = this.props.navigation.state.params;

    this.initDeck(title)
  }
  handleOnAddCardPress() {
    const { navigation } = this.props

    const { title, updateDeck } = this.props.navigation.state.params;

    navigation.navigate('AddCard', { title, updateDeck })
  }
  handleQuizPress() {
    const { navigation } = this.props
    const { deck } = this.state
    const { params } = this.props.navigation.state;

    if (deck.cards.length === 0 ) {
      return
    }

    navigation.navigate('Quiz', { 
      title: params.title
    })
  }
  renderDeck() {
    const { deck, titleAnim } = this.state

    return (
      <View style={styles.container}>
        <Animated.Text style={[styles.deckTitle, { fontSize: titleAnim }]}>{ deck.title }</Animated.Text>
        <Text style={styles.cardNumber}>
          {
            deck.cards.length > 1
              ? deck.cards.length + ' cards'
              : deck.cards.length + ' card'
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
    )
  }
  render(){
    const { deck, titleAnim } = this.state

    Animated.timing(
      titleAnim,
      {
        toValue: 50,
        duration: 600
      }
    ).start()

    return (
      deck
      ? this.renderDeck()
      : <View />
    )
  }
}

export default Deck