import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';

import styles from './DeckListStyles'

class DeckList extends Component {
  handleOnPress(key) {
    const { navigation } = this.props
    const { updateDeck } = this.props.screenProps

    navigation.navigate('Deck', { 
      title: key,
      updateDeck: updateDeck
    })
  }
  render() {
    const { decks } = this.props.screenProps

    return (
      <ScrollView>
        {
          decks 
            ? Object.keys(decks).map((key) => (
              <View key={key} style={styles.bottomBorder}>
                <TouchableOpacity 
                  style={styles.deck} 
                  onPress={() => this.handleOnPress(key)}>
                    <Text style={styles.deckTitle}>
                        {decks[key].title}
                    </Text>
                    <Text style={styles.cardNumber}>
                      {
                        decks[key].questions.length === 1
                          ? decks[key].questions.length + ' card'
                          : decks[key].questions.length + ' cards'
                      }
                    </Text>
                </TouchableOpacity>
              </View>
            ))
            : null
        }
      </ScrollView>
    )
  }
}

export default DeckList