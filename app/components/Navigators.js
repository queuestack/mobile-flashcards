import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

import DeckList from './DeckList'
import NewDeck from './NewDeck'
import Deck from './Deck'
import AddCard from './AddCard'
import Quiz from './Quiz'
import { white, black } from '../utils/colors'

const Tabs = createBottomTabNavigator({
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

  export default MainNavigator