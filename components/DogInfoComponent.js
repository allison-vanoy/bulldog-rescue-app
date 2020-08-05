import React, { Component } from 'react';
import { Text, View } from 'react-native';
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
			<Card
				featuredTitle={dog.name}
				image={{uri: baseUrl + dog.image}}>
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
		)
	}
	return <View />;
}

class DogInfo extends Component {

	markFavorite(dogId) {
		this.props.postFavorite(dogId);
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
			<RenderDog 
				dog={dog} 
				favorite={this.props.favorites.includes(dogId)} 
				markFavorite={() => this.markFavorite(dogId)}
			/>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DogInfo);