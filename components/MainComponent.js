import React, { Component } from 'react';
import Home from './HomeComponent';
import AvailableDogs from './AvailableDogsComponent';
import DogInfo from './DogInfoComponent';
import Application from './ApplicationComponent';
import { View, Platform, StyleSheet } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDogs } from '../redux/ActionCreators';

const mapDispatchToProps = {
	fetchDogs
};

const AvailableDogsNavigator = createStackNavigator(
	{
		AvailableDogs: { 
			screen: AvailableDogs,
			navigationOptions: ({navigation}) => ({
				headerTitle: 'Bulldog Rescue',
				headerStyle: {
					backgroundColor: '#75B9BE',
					elevation: 0,
					shadowOpacity: 0,
				},
				headerTitleStyle: {
					color: '#fff',
					fontSize: 26,
					alignSelf: 'center',
					textAlign: 'center',
					width: '90%',
					fontFamily: 'sans-serif-condensed',
					fontWeight: '200',
				},
				headerLeft: <Icon
					name='bars'
					type='font-awesome'
					iconStyle={styles.stackIcon}
					onPress={() => navigation.toggleDrawer()}
				/>,
				headerRight: <View />
			}),
			cardStyle: {
				backgroundColor: 'white'
			}
		},
		DogInfo: { screen: DogInfo }
	},
	{
		initialRoute: 'AvailableDogs',
		navigationOptions: {
			headerTitle: 'Bulldog Rescue',
			headerStyle: {
				backgroundColor: '#75B9BE',
				elevation: 0,
				shadowOpacity: 0,
			},
			headerTitleStyle: {
				color: '#fff',
				fontSize: 26,
				alignSelf: 'center',
				textAlign: 'center',
				width: '80%',
				fontFamily: 'sans-serif-condensed',
				fontWeight: '200',
			},
		},
		cardStyle: {
			backgroundColor: 'white'
		}
	}
);

const ApplicationNavigator = createStackNavigator(
	{
		Contact: { screen: Application }
	},
	{
		navigationOptions: ({navigation}) => ({
			headerTitle: 'Bulldog Rescue',
			headerStyle: {
				backgroundColor: '#75B9BE',
				elevation: 0,
				shadowOpacity: 0,
			},
			headerTitleStyle: {
				color: '#fff',
				fontSize: 26,
				alignSelf: 'center',
				textAlign: 'center',
				width: '90%',
				fontFamily: 'sans-serif-condensed',
				fontWeight: '200',
			},
			headerLeft: <Icon
				name='bars'
				type='font-awesome'
				iconStyle={styles.stackIcon}
				onPress={() => navigation.toggleDrawer()}
			/>,
			headerRight: <View />
		}),
		cardStyle: {
			backgroundColor: 'white'
		}
	}
);

const HomeNavigator = createStackNavigator(
	{
		Home: { screen: Home}
	},
	{
		navigationOptions: ({navigation}) => ({
			headerTitle: 'Bulldog Rescue',
			headerStyle: {
				backgroundColor: '#75B9BE',
				elevation: 0,
				shadowOpacity: 0,
			},
			headerTitleStyle: {
				color: '#fff',
				fontSize: 26,
				alignSelf: 'center',
				textAlign: 'center',
				width: '90%',
				fontFamily: 'sans-serif-condensed',
				fontWeight: '200',
			},
			headerLeft: <Icon
				name='bars'
				type='font-awesome'
				iconStyle={styles.stackIcon}
				onPress={() => navigation.toggleDrawer()}
			/>,
			headerRight: <View />
		}),
		cardStyle: {
			backgroundColor: 'white'
		}
	}
);

const MainNavigator = createDrawerNavigator(
	{
		Home: { screen: HomeNavigator },
		'Available Dogs': { screen: AvailableDogsNavigator },
		Application: { screen: ApplicationNavigator }
	},
	{
		drawerBackgroundColor: '#75B9BE'
	}
);

class Main extends Component {

	componentDidMount() {
		this.props.fetchDogs();
	}

	render() {
		return (
			<View style={{
				flex: 1,
				paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
			}}>
				<MainNavigator />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	stackIcon: {
		marginLeft: 20,
		color: '#fff',
		fontSize: 24,
	}
});

export default connect(null, mapDispatchToProps)(Main);