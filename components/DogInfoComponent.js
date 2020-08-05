import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
	return {
		dogs: state.dogs
	};
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

	constructor(props) {
		super(props);

		this.state = {
			favorite: false
		}
	};

	markFavorite() {
		this.setState({ favorite: true })
	}

	render() {
		const dogId = this.props.navigation.getParam('dogId');
        const dog = this.props.dogs.dogs.filter(dog => dog.id === dogId)[0];
		return (
			<RenderDog 
				dog={dog} 
				favorite={this.state.favorite} 
				markFavorite={() => this.markFavorite()}
			/>
		);
	}
}

export default connect(mapStateToProps)(DogInfo);