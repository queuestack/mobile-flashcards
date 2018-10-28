import React from 'react';
import { View } from 'react-native';

import DeckList from './app/components/DeckList'

export default class App extends React.Component {
  render() {
    return (
      <View>
        <DeckList />
      </View>
    );
  }
}