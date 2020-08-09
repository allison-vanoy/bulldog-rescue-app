import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Tile, Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
	return {
		dogs: state.dogs,
		favorites: state.favorites
	};
};

const mapDispatchToProps = {
	postFavorite
};

function RenderDog(props) {
	const {dog} = props;

	if (dog) {
		return (
			<View>
				<Text style={styles.pageHeader}>{dog.name}</Text>

				{/* large primary image container */}
				<Tile
					imageSrc={ props.currentImage === '' ? {uri: baseUrl + dog.images[0]} : {uri: baseUrl + props.currentImage}}
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
										source={{uri: baseUrl + item}}
									/>
								</TouchableHighlight>
							</View>
						)
					}}
					keyExtractor={item => Object.keys(item)}
					style={{justifyContent: 'center', marginTop: -66}}
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
							title='Apply to Adopt'
							buttonStyle={styles.applyButton}
							titleStyle={styles.applyButtonText}
						/>
					</View>
					<Icon
						name={props.favorite ? 'bell' : 'bell-o'}
						type='font-awesome'
						color='#D0D6B5'
						size={38}
						onPress={() => props.favorite ? console.log('Already getting notifications') : props.markFavorite()}
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
			</View>
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
					currentImage={this.state.currentImage}
					setImage={this.setImage}
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
			width: 70,
			height: 70,
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
		}
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(DogInfo);