import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Modal } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postDog } from '../redux/ActionCreators';

const mapStateToProps = state => {
	return {
		dogs: state.dogs
	};
};

const mapDispatchToProps = {
	postDog
};

class NewDog extends Component {

	constructor(props) {
		super(props);

		this.state = {
			dogName: '',
			details: {
				status: '',
				weight: '',
				age: '',
				gender: '',
				about: ''
			}
		}
	}

	handleSubmit() {
		console.log(JSON.stringify(this.state));
		this.props.postDog(this.state.dogName, this.state.details.status, this.state.details.weight, this.state.details.age, this.state.details.gender, this.state.details.about);
	}

	resetForm() {
		this.setState({
			dogName: '',
			details: {
				status: '',
				weight: '',
				age: '',
				gender: '',
				about: ''
			}
		});
	}

	render() {
		const { dog } = this.props;
		const { navigate } = this.props.navigation;

		return(
			<ScrollView>
				<View style={styles.labelRow}>
					<Text style={styles.formLabel}>Dog Name</Text>
				</View>
				<View style={styles.inputRow}>
					<Input
						placeholder='name'
						onChangeText={value => this.setState({...this.state, dogName: value})}
						value={this.state.dogName}
					/>
				</View>

				<View style={styles.labelRow}>
					<Text style={styles.formLabel}>Status</Text>
				</View>
				<View style={styles.labelRow}>
					<Picker
						style={{flex: 2, height: 20, marginLeft: 10}}
						selectedValue={this.state.details.status}
						onValueChange={value => this.setState({...this.state, details: {...this.state.details, status: value}})}> 
						<Picker.Item label='Available' value='Available' />
						<Picker.Item label='On Hold' value='On Hold' />
					</Picker>
				</View>

				<View style={styles.labelRow}>
					<Text style={styles.formLabel}>Weight</Text>
				</View>
				<View style={styles.inputRow}>
					<Input
						placeholder='weight'
						onChangeText={value => this.setState({...this.state, details: {...this.state.details, weight: value}})}
						value={this.state.details.weight}
					/>
				</View>
				
				<View style={styles.labelRow}>
					<Text style={styles.formLabel}>Age</Text>
				</View>
				<View style={styles.inputRow}>
					<Input
						placeholder='age'
						onChangeText={value => this.setState({...this.state, details: {...this.state.details, age: value}})}
						value={this.state.details.age}
					/>
				</View>
				
				<View style={styles.labelRow}>
					<Text style={styles.formLabel}>Gender</Text>
				</View>
				<View style={styles.labelRow}>
					<Picker
						style={{flex: 2, height: 20, marginLeft: 10}}
						selectedValue={this.state.details.gender}
						onValueChange={value => this.setState({...this.state, details: {...this.state.details, gender: value}})}>
						<Picker.Item label='Male' value='Male' />
						<Picker.Item label='Female' value='Female' />
					</Picker>
				</View>
				
				<View style={styles.labelRow}>
					<Text style={styles.formLabel}>About</Text>
				</View>
				<View style={styles.inputRow}>
					<Input
						placeholder='about'
						onChangeText={value => this.setState({...this.state, details: {...this.state.details, about: value}})}
						value={this.state.details.about}
						multiline={true}
						numberOfLines={2}
					/>
				</View>
				<View style={styles.labelRow}>
					<Button
						onPress={() => {
							this.handleSubmit();
							this.resetForm();
							navigate('AvailableDogs')
						}}
						title='Submit Application'
						buttonStyle={styles.submitButton}
						titleStyle={styles.submitButtonText}
					/>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	labelRow: {
		justifyContent: 'center',
		flex: 1,
		flexDirection: 'row',
		marginLeft: 20,
		marginTop: 20
	},
	inputRow: {
		flexDirection: 'row',
		marginLeft: 25,
	},
	formLabel: {
		fontSize: 12,
		flex: 2
	},
	modal: {
		justifyContent: 'center',
		margin: 20
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 20
	},
	modalText: {
		fontSize: 18,
		margin: 10,
		marginBottom: 20
	},
	submitButton: {
		width: 250,
		height: 35,
		backgroundColor: '#F9B5AC',
		borderWidth: 1,
		borderColor: '#F9B5AC',
		borderRadius: 25,
		marginTop: 20
	},
	submitButtonText: {
		fontSize: 18,
		fontFamily: 'Roboto',
		textShadowColor: 'rgba(235, 87, 87, 0.5)',
		textShadowOffset: {width: 1, height: 2},
		textShadowRadius: 1
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDog);