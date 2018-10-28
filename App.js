import React from 'react';
import { setNotification, getDecks } from './app/utils/helpers'
import MainNavigator from './app/components/Navigators'

class App extends React.Component {
  state = {
    decks: []
  }
  componentDidMount() {
    setNotification()
    this.refresh()
  }
  refresh() {
    getDecks()
      .then((decks) => {
        this.setState({
          decks: decks
        })
      })
  }
  render() {
    return (
      <MainNavigator screenProps={{
        decks: this.state.decks,
        refreshDeck: () => this.refresh()
      }}/>
    );
  }
}

export default App