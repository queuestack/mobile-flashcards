import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';

class DeckList extends Component {
  handleOnPress(key) {
    const { navigation } = this.props
    const { refreshDeck } = this.props.screenProps

    navigation.navigate('Deck', { 
      title: key,
      refreshDeck: refreshDeck
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

const styles = StyleSheet.create({
  deck: {
    padding: 40
  },
  deckTitle: {
    fontWeight: '900',
    fontSize: 20,
    textAlign: 'center'
  },
  cardNumber: {
    textAlign: 'center'
  },
  bottomBorder: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});

export default DeckList