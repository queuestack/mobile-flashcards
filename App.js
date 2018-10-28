import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import reducer from './app/store/reducers'
import DeckList from './app/components/DeckList'


const middleware = applyMiddleware(thunk)
const store = createStore(reducer, middleware)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <DeckList />
        </View>
      </Provider>
    );
  }
}