import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';

class DeckList extends Component {
	renderDeck = (item) => {
		return (
			<View>
				<TouchableOpacity>
					<View>
						<Text>Card Name</Text>
					</View>
					<View>
						<Text>Number of questions</Text>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
	render() {
		return (
			<View>
				<FlatList 
					data={['Hello', 'Hi']}
					renderItem={this.renderDeck}
				/>
			</View>
			
		)
	}
}

export default DeckList