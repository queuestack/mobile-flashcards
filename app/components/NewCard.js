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
  saveDeckTitle
} from '../utils/helpers'

class NewDeck extends Component {
  state = {
    deckTitle: ''
  }
  handleOnPress() {
    const { deckTitle } = this.state
    const { dispatch, navigation } = this.props
    const { refreshDeck } = this.props.screenProps 

    if (deckTitle.length == 0) {
      return;
    }

    //Create the new deck
    saveDeckTitle( deckTitle )
      .then(() => {
        //Refresh the decks
        refreshDeck()

        //Navigate to the deck screen
        navigation.navigate('Deck', { 
          title: deckTitle,
          refreshDeck: refreshDeck
         })

        //Reset the state
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
            style={Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  text: {
    fontWeight: '900',
    fontSize: 40,
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
  blackButton: {
    backgroundColor: black
  },
  whiteText: {
    color: white
  }
})

export default NewDeck