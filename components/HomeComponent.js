import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { baseUrl } from '../shared/baseUrl';

class Home extends Component {

	constructor(props) {
		super(props);

		this.state = {
			fosters: [
				{
					id: 1,
					name: 'Alice',
					photo: '/assets/images/fosters/foster1.jpg',
					bio: 'Semper feugiat nibh sed pulvinar proin gravida. Eu mi bibendum neque egestas congue. Tortor posuere ac ut consequat semper viverra nam. Lobortis mattis aliquam faucibus purus in massa tempor. Porttitor massa id neque aliquam vestibulum morbi.'
				},
				{
					id: 2,
					name: 'Sam',
					photo: '/assets/images/fosters/foster2.jpg',
					bio: 'Lectus mauris ultrices eros in cursus turpis. Sed libero enim sed faucibus turpis. Massa tincidunt dui ut ornare lectus sit amet est placerat. Elementum sagittis vitae et leo duis. Ut tellus elementum sagittis vitae et leo duis.'
				},
				{
					id: 3,
					name: 'Ryan',
					photo: '/assets/images/fosters/foster3.jpg',
					bio: 'Arcu bibendum at varius vel pharetra vel turpis nunc eget. Sit amet consectetur adipiscing elit ut aliquam purus sit. Lectus quam id leo in vitae turpis. Scelerisque eu ultrices vitae auctor eu augue ut. Donec massa sapien faucibus et molestie.'
				}
			]
		}
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				<Text style={styles.pageHeader}>About Us</Text>
				<Text style={{marginBottom: 20}}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
				</Text>

				<Text style={styles.pageHeader}>Meet Our Fosters</Text>
				{
					this.state.fosters.map(foster => {
						return (
							<View style={{alignItems: 'center'}}>
								<Image
									style={styles.fosterPhoto}
									source={{uri: baseUrl + foster.photo}}
								/>
								<Text style={styles.subHeader}>{foster.name}</Text>
								<Text style={{marginBottom: 40}}>{foster.bio}</Text>
							</View>
						)
					})
				}
			</ScrollView>
		);
	}
};

const styles = StyleSheet.create(
	{
		container: {
			marginTop: 10,
			marginRight: 30,
			marginLeft: 30,
			marginBottom: 10
		},
		pageHeader: {
			textAlign: 'center',
			fontSize: 22,
			fontFamily: 'Roboto',
			fontWeight: '100',
			lineHeight: 50
		},
		subHeader: {
			fontSize: 20,
			fontFamily: 'sans-serif-condensed',
			fontWeight: '400',
			lineHeight: 40
		},
		fosterPhoto: {
			width: 100,
			height: 100,
			borderWidth: 5,
			borderRadius: 50,
			borderColor: '#D0D6B5'
		}
	}
)

export default Home;