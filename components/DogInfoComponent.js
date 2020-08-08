import React, { Component } from 'react';
import { Text, View, FlatList, ScrollView, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Tile } from 'react-native-elements';
import { Card, Icon } from 'react-native-elements';
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
				<Tile
					style={styles.primaryImage}
					imageSrc={ props.currentImage === '' ? {uri: baseUrl + dog.images[0]} : {uri: baseUrl + props.currentImage}}
				/>
				<FlatList
					horizontal
					data={dog.images}
					renderItem={({item}) => {
						return (
							<View>
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
				/>
				<Card
					featuredTitle={dog.name}
					image={{uri: baseUrl + dog.images[0]}}>
					<Text style={{margin:10}}>
						{dog.about}
					</Text>
					<Icon
						name={props.favorite ? 'heart' : 'heart-o'}
						type='font-awesome'
						color='#EE7674'
						onPress={() => props.favorite ? console.log('Already a favorite') : props.markFavorite()}
					/>
				</Card>
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
		console.log('entered');
		this.setState({currentImage: image});
		console.log(this.state.currentImage);
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
		thumbnailImages: {
			width: 100,
			height: 100,
			borderColor: '#fff',
			borderStyle: 'solid',
			borderWidth: 5,
			borderLeftWidth: 0,
			margin: 0,
			padding: 0
		},
		primaryImage: {
			flex: 1,
			margin: 0,
			padding: 0
		}
	}
)

export default connect(mapStateToProps, mapDispatchToProps)(DogInfo);