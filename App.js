import React from 'react';
import { getDecks } from './app/utils/api'
import { setNotification } from './app/utils/helpers'
import MainNavigator from './app/components/Navigators'

class App extends React.Component {
  state = {
    decks: null
  }
  componentDidMount() {
    setNotification()
    this.updateDeck()
  }
  updateDeck() {
    getDecks()
      .then((decks) => {
        this.setState({ decks })
      })
  }
  render() {
    return (
      <MainNavigator screenProps={{
        decks: this.state.decks,
        updateDeck: () => this.updateDeck()
      }}/>
    );
  }
}

export default App