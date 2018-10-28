import React from 'react';
import { 
  createMaterialTopTabNavigator,
  createStackNavigator
} from 'react-navigation'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import { white, black } from './utils/colors'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { 
  setNotification, 
  getDecks 
} from './utils/helpers'

const Tabs = createMaterialTopTabNavigator({
  'Decks': { 
    screen: DeckList
  },
  'New Deck': {
    screen: NewDeck
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerLeftTintColor: white,
      title: 'Deck',
      headerStyle: {
        backgroundColor: black
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: white,
      headerLeftTintColor: white,
      title: `Add Card`,
      headerStyle: {
        backgroundColor: black
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerLeftTintColor: white,
      title: `Quiz`,
      headerStyle: {
        backgroundColor: black
      }
    }
  }
})

class App extends React.Component {
  state = {
    decks: null
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