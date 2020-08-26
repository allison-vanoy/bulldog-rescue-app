import React, { Component } from 'react';
import { Text, FlatList, StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Tile, Button } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { postToAvailable, postToPending, postToHold, postFavorite, postToAdopted } from '../redux/ActionCreators';

const mapStateToProps = state => {
	return {
		dogs: state.dogs
	};
};

const mapDispatchToProps = {
	postToAvailable,
	postToPending,
	postToHold,
	postFavorite,
	postToAdopted
};

class AvailableDogs extends Component {

	moveToAvailable(dogToMove) {
		this.props.postToAvailable(dogToMove);
	}

	moveToPending(dogToMove) {
		this.props.postToPending(dogToMove);
	}

	moveToHold(dogToMove) {
		this.props.postToHold(dogToMove);
	}

	moveToAdopted(dogToMove) {
		this.props.postToAdopted(dogToMove);
	}

	markFavorite(dogId) {
		this.props.postFavorite(dogId);
	}

	render() {
		const { navigate } = this.props.navigation;
		let currentlySwipedDog = {};

		//////////////////////
		//admin user - swipe buttons
		//////////////////////
		const onHoldBtns = [
			{
				component: (
					<ScrollView style={{height: 300}}>
						<View 
							style={{
								backgroundColor: '#F9B5AC', height: 150, justifyContent: 'center'
							}}
						>
							<TouchableOpacity onPress={() => this.moveToAvailable(currentlySwipedDog)}>
								<Text style={[styles.btnText, styles.topSwipeBtn]}>
									Move to Available
								</Text>
							</TouchableOpacity>
						</View>
						<View 
							style={{
								backgroundColor: '#75B9BE', height: 150, justifyContent: 'center'
							}}
						>
							<Text style={[styles.btnText, styles.bottomSwipeBtn]}>
								Update
							</Text>
						</View>
					</ScrollView>
				)
			}
		]

		const availableBtns = [
			{
				component: (
					<ScrollView style={{height: 300}}>
						<View 
							style={{
								backgroundColor: '#F9B5AC', height: 100, justifyContent: 'center'
							}}
						>
							<TouchableOpacity onPress={() => this.moveToPending(currentlySwipedDog)}>
								<Text style={[styles.btnText, styles.topSwipeBtn]}>
									Move to Pending Adoption
								</Text>
							</TouchableOpacity>
						</View>
						<View 
							style={{
								backgroundColor: '#D0D6B5', height: 100, justifyContent: 'center'
							}}
						>
							<TouchableOpacity onPress={() => this.moveToHold(currentlySwipedDog)}>
								<Text style={[styles.btnText, styles.middleSwipeBtn]}>
									Return to On Hold
								</Text>
							</TouchableOpacity>
						</View>
						<View 
							style={{
								backgroundColor: '#75B9BE', height: 100, justifyContent: 'center'
							}}
						>
							<Text style={[styles.btnText, styles.bottomSwipeBtn]}>
								Update
							</Text>
						</View>
					</ScrollView>
				)
			}
		]

		const pendingBtns = [
			{
				component: (
					<ScrollView style={{height: 300}}>
						<View 
							style={{
								backgroundColor: '#F9B5AC', height: 300, justifyContent: 'center'
							}}
						>
							<TouchableOpacity onPress={() => this.moveToAdopted(currentlySwipedDog)}>
								<Text style={[styles.btnText, styles.topSwipeBtn]}>
									Move to Adopted
								</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				)
			}
		]
		//end admin swipe buttons

		//////////////////////
		//standard user - swipe buttons
		//////////////////////
		// const onHoldBtns = [
		// 	{
		// 		component: (
		// 			<ScrollView style={{height: 300}}>
		// 				<View 
		// 					style={{
		// 						backgroundColor: '#75B9BE', height: 300, justifyContent: 'center'
		// 					}}
		// 				>
		// 					<TouchableOpacity onPress={() => this.markFavorite(currentlySwipedDog)}>
		// 						<Text style={[styles.btnText, styles.bottomSwipeBtn]}>
		// 							Add to Favorites
		// 						</Text>
		// 					</TouchableOpacity>
		// 				</View>
		// 			</ScrollView>
		// 		)
		// 	}
		// ]

		// const availableBtns = [
		// 	{
		// 		component: (
		// 			<ScrollView style={{height: 300}}>
		// 				<View 
		// 					style={{
		// 						backgroundColor: '#F9B5AC', height: 150, justifyContent: 'center'
		// 					}}
		// 				>
		// 					<TouchableOpacity onPress={() => navigate('Application')}>
		// 						<Text style={[styles.btnText, styles.topSwipeBtn]}>
		// 							Apply to Adopt
		// 						</Text>
		// 					</TouchableOpacity>
		// 				</View>
		// 				<View 
		// 					style={{
		// 						backgroundColor: '#75B9BE', height: 150, justifyContent: 'center'
		// 					}}
		// 				>
		// 					<TouchableOpacity onPress={() => markFavorite(currentlySwipedDog)}>
		// 						<Text style={[styles.btnText, styles.bottomSwipeBtn]}>
		// 							Add to Favorites
		// 						</Text>
		// 					</TouchableOpacity>
		// 				</View>
		// 			</ScrollView>
		// 		)
		// 	}
		// ]
		//end standard user swipe buttons

		const renderAvailableDogsItem = ({item}) => {
			//if user is admin use adminBtns : use defaultBtns
			return (
				<Swipeout right={item.details.status == "On Hold" ? onHoldBtns : item.details.status == "Available" ?  availableBtns : item.details.status == "Pending Adoption" ? pendingBtns : null} autoClose={true} buttonWidth={100} onOpen={() => (currentlySwipedDog = item)}>
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

				{
					this.props.dogs.dogs.filter(dog => dog.details.status === "Available").length > 0 ? <Text style={styles.pageHeader}>Available Dogs</Text> : null
				}
				<FlatList
					data={this.props.dogs.dogs.filter(dog => dog.details.status === "Available")}
					renderItem={renderAvailableDogsItem}
					keyExtractor={item => item.id.toString()}
				/>

				{
					this.props.dogs.dogs.filter(dog => dog.details.status === "On Hold").length > 0 ? <Text style={styles.pageHeader}>On Hold</Text> : null
				}
				<FlatList
					data={this.props.dogs.dogs.filter(dog => dog.details.status === "On Hold")}
					renderItem={renderAvailableDogsItem}
					keyExtractor={item => item.id.toString()}
				/>

				{
					this.props.dogs.dogs.filter(dog => dog.details.status === "Pending Adoption").length > 0 ? <Text style={styles.pageHeader}>Pending Adoptions</Text> : null
				}
				<FlatList
					data={this.props.dogs.dogs.filter(dog => dog.details.status === "Pending Adoption")}
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
			lineHeight: 50,
			marginTop: 15
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
		btnText: {
			fontSize: 18,
			textAlign: 'center',
			color: '#FFFFFF',
			fontFamily: 'sans-serif-condensed',
			textShadowOffset: {width: 1, height: 2},
			textShadowRadius: 1
		},
		topSwipeBtn: {
			textShadowColor: 'rgba(235, 87, 87, 0.5)',
		},
		middleSwipeBtn: {
			textShadowColor: 'rgba(109, 112, 95, 0.5)',
		},
		bottomSwipeBtn: {
			textShadowColor: 'rgba(105, 73, 88, 0.5)',
		}
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(AvailableDogs);