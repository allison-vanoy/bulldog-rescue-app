import React, { Component } from 'react';
import { Text, FlatList, StyleSheet, ScrollView, View } from 'react-native';
import { Tile, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

const mapStateToProps = state => {
	return {
		dogs: state.dogs
	};
};

class AvailableDogs extends Component {

	render() {
		const { navigate } = this.props.navigation;
		const renderAvailableDogsItem = ({item}) => {
			return (
				<Tile
					title={item.name}
					titleStyle={styles.dogTitle}
					featured
					onPress={() => navigate('DogInfo', { dogId: item.id })}
					imageSrc={{uri: baseUrl + item.images[0]}}
				/>
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

				{/* only display button to admin users */}
				<View>
					<Button
						title={'Add New Dog'}
						buttonStyle={styles.addDogButton}
						titleStyle={styles.addDogButtonText}
						onPress={() => navigate('NewDog')}
					/>
				</View>
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
	}
)

export default connect(mapStateToProps)(AvailableDogs);