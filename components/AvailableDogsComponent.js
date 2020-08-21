import React, { Component } from 'react';
import { Text, FlatList, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Tile, Button } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
	return {
		dogs: state.dogs
	};
};

class AvailableDogs extends Component {

	moveToAvailable(dogObj) {
		console.log(JSON.stringify(dogObj));
	}

	render() {
		const { navigate } = this.props.navigation;
		let currentlySwipedDog = {};

		const adminBtns = [
			{
				component: (
					<ScrollView style={{height: 300}}>
						<View 
							style={{
								backgroundColor: '#F9B5AC', height: 150, justifyContent: 'center'
							}}
						>
							<TouchableOpacity onPress={() => this.moveToAvailable(currentlySwipedDog)}>
								<Text style={styles.topSwipeBtn}>
									Move to Available
								</Text>
							</TouchableOpacity>
						</View>
						<View 
							style={{
								backgroundColor: '#75B9BE', height: 150, justifyContent: 'center'
							}}
						>
							<Text style={styles.bottomSwipeBtn}>
								Update
							</Text>
						</View>
					</ScrollView>
				)
			}
		]

		const renderAvailableDogsItem = ({item}) => {
			//if user is admin use adminBtns : use defaultBtns
			return (
				<Swipeout right={adminBtns} autoClose={true} buttonWidth={100} onOpen={() => (currentlySwipedDog = item)}>
					<Tile
						title={item.name}
						titleStyle={styles.dogTitle}
						featured
						onPress={() => navigate('DogInfo', { dogId: item.id })}
						height={300}
						// image types only split out for testing/dev
						imageSrc={item.images[0].includes('file:/') ? {uri: item.images[0]} : {uri: baseUrl + item.images[0]}}
					/>
				</Swipeout>
			)
			// return (
			// 	<Tile
			// 		title={item.name}
			// 		titleStyle={styles.dogTitle}
			// 		featured
			// 		onPress={() => navigate('DogInfo', { dogId: item.id })}
			// 		// image types only split out for testing/dev
			// 		imageSrc={item.images[0].includes('file:/') ? {uri: item.images[0]} : {uri: baseUrl + item.images[0]}}
			// 	/>
			// )
		};

		if (this.props.dogs.isLoading) {
			return (
				<Loading />
			);
		};

		if (this.props.dogs.errMess) {
			return (
				<Text>{this.props.dogs.errMess}</Text>
			)
		}

		return (
			<ScrollView>

				{/* only display button to admin users */}
				<View style={styles.buttonRow}>
					<Button
						title={'Add New Dog'}
						buttonStyle={styles.addDogButton}
						titleStyle={styles.addDogButtonText}
						onPress={() => navigate('NewDog')}
					/>
				</View>

				<Text style={styles.pageHeader}>Available Dogs</Text>
				<FlatList
					data={this.props.dogs.dogs.filter(dog => dog.details.status === "Available")}
					renderItem={renderAvailableDogsItem}
					keyExtractor={item => item.id.toString()}
				/>

				<Text style={styles.pageHeader}>On Hold</Text>
				<FlatList
					data={this.props.dogs.dogs.filter(dog => dog.details.status === "On Hold")}
					renderItem={renderAvailableDogsItem}
					keyExtractor={item => item.id.toString()}
				/>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create(
	{
		pageHeader: {
			textAlign: 'center',
			fontSize: 22,
			fontFamily: 'Roboto',
			fontWeight: '100',
			lineHeight: 50
		},
		dogTitle: {
			fontFamily: 'sans-serif-condensed',
			fontSize: 18,
			position: 'absolute',
			top: 0,
			backgroundColor: 'rgba(0, 0, 0, 0.4)',
			lineHeight: 50,
			width: '120%',
		},
		buttonRow: {
			justifyContent: 'center',
			flex: 1,
			flexDirection: 'row',
			marginLeft: 20,
			marginTop: 20
		},
		addDogButton: {
			width: 250,
			height: 35,
			backgroundColor: '#F9B5AC',
			borderWidth: 1,
			borderColor: '#F9B5AC',
			borderRadius: 25,
		},
		addDogButtonText: {
			fontSize: 18,
			fontFamily: 'Roboto',
			textShadowColor: 'rgba(235, 87, 87, 0.5)',
			textShadowOffset: {width: 1, height: 2},
			textShadowRadius: 1
		},
		topSwipeBtn: {
			fontSize: 18,
			textAlign: 'center',
			color: '#FFFFFF',
			fontFamily: 'sans-serif-condensed',
			textShadowColor: 'rgba(235, 87, 87, 0.5)',
			textShadowOffset: {width: 1, height: 2},
			textShadowRadius: 1
		},
		bottomSwipeBtn: {
			fontSize: 18,
			textAlign: 'center',
			color: '#FFFFFF',
			fontFamily: 'sans-serif-condensed',
			textShadowColor: 'rgba(105, 73, 88, 0.5)',
			textShadowOffset: {width: 1, height: 2},
			textShadowRadius: 1
		}
	}
)

export default connect(mapStateToProps)(AvailableDogs);