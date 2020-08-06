import React, { Component } from 'react';
import Home from './HomeComponent';
import Directory from './DirectoryComponent';
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

const DirectoryNavigator = createStackNavigator(
	{
		Directory: { 
			screen: Directory,
			navigationOptions: ({navigation}) => ({
				headerLeft: <Icon
					name='list'
					type='font-awesome'
					iconStyle={styles.stackIcon}
					onPress={() => navigation.toggleDrawer()}
				/>
			})
		},
		DogInfo: { screen: DogInfo }
	},
	{
		initialRoute: 'Directory',
		navigationOptions: {
			headerTitle: 'Bulldog Rescue',
			headerStyle: {
				backgroundColor: '#75B9BE' 
			},
			headerTitleStyle: {
				color: '#FFFFFF'
			}
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
				backgroundColor: '#75B9BE' 
			},
			headerTitleStyle: {
				color: '#FFFFFF'
			},
			headerLeft: <Icon
				name='list'
				type='font-awesome'
				iconStyle={styles.stackIcon}
				onPress={() => navigation.toggleDrawer()}
			/>
		})
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
				backgroundColor: '#75B9BE' 
			},
			headerTitleStyle: {
				color: '#FFFFFF'
			},
			headerLeft: <Icon
				name='list'
				type='font-awesome'
				iconStyle={styles.stackIcon}
				onPress={() => navigation.toggleDrawer()}
			/>
		})
	}
);

const MainNavigator = createDrawerNavigator(
	{
		Home: { screen: HomeNavigator },
		Directory: { screen: DirectoryNavigator },
		Application: { screen: ApplicationNavigator }
	},
	{
		drawerBackgroundColor: '#75B9BE'
	}
)

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
		marginLeft: 10,
		color: '#fff',
		fontSize: 24
	}
});

export default connect(null, mapDispatchToProps)(Main);