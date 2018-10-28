import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { saveDeckTitle } from '../utils/api'

import styles from './NewDeckStyles'

class NewDeck extends Component {
  state = {
    deckTitle: ''
  }
  handleOnPress() {
    const { deckTitle } = this.state
    const { navigation } = this.props
    const { updateDeck } = this.props.screenProps 

    if (deckTitle.length == 0) {
      return;
    }

    saveDeckTitle( deckTitle )
      .then(() => {
        updateDeck()

        navigation.navigate('Home', { 
          title: deckTitle,
          updateDeck: updateDeck
         })

        this.setState({ 
          deckTitle: ''
        })
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>What is the title of your new deck?</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput 
            style={styles.textInput}
            placeholder="Deck Title"
            value={this.state.deckTitle}
            onChangeText={ (text) => this.setState({ deckTitle: text }) } />
        </View>
        <View>
          <TouchableOpacity 
            style={[styles.button, styles.blackButton]}
            onPress={() => this.handleOnPress()}>
            <Text style={styles.whiteText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default NewDeck