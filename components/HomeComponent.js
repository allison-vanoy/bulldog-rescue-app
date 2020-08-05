import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

class Home extends Component {

	render() {
		return (
			<ScrollView style={{ margin: 30 }}>
				<Text>
					About Us
				</Text>
				<Text>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</Text>
			</ScrollView>
		);
	}
};

export default Home;