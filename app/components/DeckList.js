import React, { Component } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';

import styles from './DeckListStyles'
import { FlatList } from 'react-native-gesture-handler';

class DeckList extends Component {
  handleOnPress(key) {
    const { navigation } = this.props
    const { updateDeck } = this.props.screenProps

    navigation.navigate('Deck', { 
      title: key,
      updateDeck: updateDeck
    })
  }
  renderDeck = ({item}) => {
    const { decks } = this.props.screenProps
    const key = item
    const nCards = decks[key].cards.length
    const deckTitle = decks[key].title
    const deckSize = nCards > 1 ? nCards + ' cards' : nCards + ' card'
    
    

    return (
      <View key={key} style={styles.bottomBorder}>
        <TouchableOpacity 
          style={styles.deck} 
          onPress={() => this.handleOnPress(key)}>
          <Text style={styles.deckTitle}>
            { deckTitle }
          </Text>
          <Text style={styles.cardNumber}>
            { deckSize }
          </Text>
        </TouchableOpacity>
      </View>  
    )
  }
  render() {
    const { decks } = this.props.screenProps

    return (
      decks 
        ? 
          <FlatList
            data={Object.keys(decks)}
            renderItem={this.renderDeck}
            keyExtractor={(item, index) => index.toString()}
          />        
        : null
    )
  }
}

export default DeckList