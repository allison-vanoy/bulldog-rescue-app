import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Tile, Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { postFavorite, postNotification } from '../redux/ActionCreators';

const mapStateToProps = state => {
	return {
		dogs: state.dogs,
		favorites: state.favorites,
		notifications: state.notifications
	};
};

const mapDispatchToProps = {
	postFavorite,
	postNotification
};

function RenderDog(props) {
	const {dog, navigation} = props;

	if (dog) {
		return (
			<ScrollView>
				<Text style={styles.pageHeader}>{dog.name}</Text>

				{/* large primary image container */}
				<Tile
					imageSrc={ props.currentImage === '' && !dog.images[0].includes('file:/') ? {uri: baseUrl + dog.images[0]} : 
								props.currentImage !== '' && !props.currentImage.includes('file:/') ? {uri: baseUrl + props.currentImage} : 
								props.currentImage === '' ? {uri: dog.images[0]} :
								{uri: props.currentImage}
							}
				/>

				{/* thumbnail images container */}
				<FlatList
					horizontal
					data={dog.images}
					renderItem={({item}) => {
						return (
							<View style={styles.thumbnailContainer}>
								<TouchableHighlight onPress={() => props.setImage(item)}>
									<Image
										style={styles.thumbnailImages}
										// source={{uri: baseUrl + item}}
										source={item.includes('file:/') ? {uri: item} : {uri: baseUrl + item}}
									/>
								</TouchableHighlight>
							</View>
						)
					}}
					keyExtractor={item => Object.keys(item)}
					style={(dog.images.length > 4) ? {marginTop: -66} : {justifyContent: 'center', marginTop: -66}}
				/>

				{/* row with heart and notify icons and apply button */}
				<View style={styles.optionContainer}>
					<Icon
						name={props.favorite ? 'heart' : 'heart-o'}
						type='font-awesome'
						color='#EE7674'
						size={38}
						onPress={() => props.favorite ? console.log('Already a favorite') : props.markFavorite()}
					/>
					<View>
						<Button
							title={dog.details.status === 'Available' ? 'Apply to Adopt' : 'Not Yet Available'}
							disabled={dog.details.status === 'Available' ? false : true}
							buttonStyle={styles.applyButton}
							titleStyle={styles.applyButtonText}
							onPress={() => navigation.navigate('Application')}
						/>
					</View>
					<Icon
						name={props.notifications ? 'bell' : 'bell-o'}
						type='font-awesome'
						color='#D0D6B5'
						size={38}
						onPress={() => props.notifications ? console.log('Already getting notifications') : props.markForNotifications()}
					/>
				</View>

				{/* dog details and about section */}
				<View style={styles.detailsContainer}>
					<Text style={styles.pageSubHeaders}>{dog.name}'s Details</Text>
					<Text>Status:  {dog.details.status}</Text>
					<Text>Weight:  {dog.details.weight}</Text>
					<Text>Age:  {dog.details.age}</Text>
					<Text>Gender:  {dog.details.gender}</Text>
				</View>

				<View style={styles.detailsContainer}>
					<Text style={styles.pageSubHeaders}>More About Me</Text>
					<Text>{dog.details.about}</Text>
				</View>

				{/* donate button */}
				<View style={styles.donateContainer}>
					<Button
						title='Donate to My Care'
						buttonStyle={styles.donateButton}
						titleStyle={styles.donateButtonText}
					/>
				</View>
			</ScrollView>
		)
	}
	return <View />;
}

class DogInfo extends Component {

	constructor(props) {
		super(props);

		this.state = {
			currentImage: '',
		}
	}

	markForNotifications(dogId) {
		this.props.postNotification(dogId);
	}

	markFavorite(dogId) {
		this.props.postFavorite(dogId);
	}

	setImage = (image) => {
		this.setState({currentImage: image});
	}

	render() {
		const dogId = this.props.navigation.getParam('dogId');
		const dog = this.props.dogs.dogs.filter(dog => dog.id === dogId)[0];
		
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
				<RenderDog 
					dog={dog} 
					favorite={this.props.favorites.includes(dogId)}
					markFavorite={() => this.markFavorite(dogId)}
					notifications={this.props.notifications.includes(dogId)}
					markForNotifications={() => this.markForNotifications(dogId)}
					currentImage={this.state.currentImage}
					setImage={this.setImage}
					navigation={this.props.navigation}
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
			fontFamily: 'sans-serif-condensed',
			fontWeight: '100',
			lineHeight: 50
		},
		pageSubHeaders: {
			textAlign: 'center',
			fontSize: 20,
			fontFamily: 'sans-serif-condensed',
			fontWeight: '100',
			lineHeight: 40
		},
		thumbnailContainer: {
			borderColor: '#fff',
			borderStyle: 'solid',
			borderTopWidth: 4,
			borderBottomWidth: 4,
			borderLeftWidth: 2,
			borderRightWidth: 2,
		},
		thumbnailImages: {
			width: 85,
			height: 85,
		},
		optionContainer: {
			flex: 1, 
			flexDirection: 'row', 
			justifyContent: 'space-around',
			marginTop: 20
		},
		applyButton: {
			width: 250,
			height: 35,
			backgroundColor: '#F9B5AC',
			borderWidth: 1,
			borderColor: '#F9B5AC',
			borderRadius: 25,
		},
		applyButtonText: {
			fontSize: 18,
			fontFamily: 'Roboto',
			textShadowColor: 'rgba(235, 87, 87, 0.5)',
			textShadowOffset: {width: 1, height: 2},
			textShadowRadius: 1
		},
		detailsContainer: {
			marginTop: 20,
			marginLeft: 40,
			marginRight: 40,
		},
		donateContainer: {
			flex: 1, 
			justifyContent: 'center', 
			alignItems: 'center',
			marginTop: 40,
			marginBottom: 40
		},
		donateButton: {
			width: 250,
			height: 35,
			backgroundColor: '#D0D6B5',
			borderWidth: 1,
			borderColor: '#D0D6B5',
			borderRadius: 25,
		},
		donateButtonText: {
			fontSize: 18,
			fontFamily: 'Roboto',
			textShadowColor: 'rgba(109, 112, 95, 0.5)',
			textShadowOffset: {width: 1, height: 2},
			textShadowRadius: 1
		}
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(DogInfo);