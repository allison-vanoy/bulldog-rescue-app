import React, { Component } from 'react';
import { Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Tile } from 'react-native-elements';
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
					data={this.props.dogs.dogs}
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
			fontFamily: 'sans-serif-condensed',
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
		}
	}
)

export default connect(mapStateToProps)(AvailableDogs);