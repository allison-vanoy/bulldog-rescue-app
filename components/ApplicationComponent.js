import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Modal } from 'react-native';
import { Input, Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

class Application extends Component {

	constructor(props) {
		super(props);

		this.state = {
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			dogName: '',
			adoptDate: '',
			showModal: false
		}
	}

	toggleModal() {
		this.setState({showModal: !this.state.showModal})
	}

	handleSubmit() {
		console.log(JSON.stringify(this.state));
		this.toggleModal();
	}

	resetForm() {
		this.setState({
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			dogName: '',
			adoptDate: '',
			showModal: false
		});
	}

	render() {
		return(
			<ScrollView>
				<View style={styles.labelRow}>
					<Text style={styles.formLabel}>First Name</Text>
				</View>
				<View style={styles.inputRow}>
					<Input
						placeholder='first name'
						onChangeText={value => this.setState({firstName: value})}
						value={this.state.firstName}
					/>
				</View>

				<View style={styles.labelRow}>
					<Text style={styles.formLabel}>Last Name</Text>
				</View>
				<View style={styles.inputRow}>
					<Input
						placeholder='last name'
						onChangeText={value => this.setState({lastName: value})}
						value={this.state.lastName}
					/>
				</View>
				
				<View style={styles.labelRow}>
					<Text style={styles.formLabel}>Phone Number</Text>
				</View>
				<View style={styles.inputRow}>
					<Input
						placeholder='phone number'
						onChangeText={value => this.setState({phone: value})}
						value={this.state.phone}
					/>
				</View>
				
				<View style={styles.labelRow}>
					<Text style={styles.formLabel}>Email Address</Text>
				</View>
				<View style={styles.inputRow}>
					<Input
						placeholder='email'
						onChangeText={value => this.setState({email: value})}
						value={this.state.email}
					/>
				</View>
				
				<View style={styles.labelRow}>
					<Text style={styles.formLabel}>Name of dog you are applying for</Text>
				</View>
				<View style={styles.labelRow}>
					<Picker
						style={{flex: 2, height: 20, marginLeft: 10}}
						selectedValue={this.state.dogName}
						onValueChange={value => this.setState({dogName: value})}>
						<Picker.Item label='George' value='George' />
						<Picker.Item label='Marshmallow' value='Marshmallow' />
					</Picker>
				</View>

				<View style={styles.labelRow}>
					<Text style={styles.formLabel}>Date you will be ready to adopt</Text>
				</View>
				<View style={styles.labelRow}>
					<DatePicker
						style={{flex: 2, marginRight: 20, marginLeft: 15}}
						date={this.state.adoptDate}
						format='DD-MM-YYYY'
						mode='date'
						placeholder='Select Date'
						minDate={new Date().toISOString()}
						confirmBtnText='Confirm'
						cancelBtnText='Cancel'
						customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								top: 4,
								marginLeft: 0
							},
							dateInput: {
								marginLeft: 36
							}
						}}
						onDateChange={date => {this.setState({adoptDate: date})}}
					/>
				</View>
				<View style={styles.labelRow}>
					<Button
						onPress={() => this.handleSubmit()}
						title='Submit Application'
						buttonStyle={styles.submitButton}
						titleStyle={styles.submitButtonText}
					/>
				</View>
				<Modal
					animationType={'slide'}
					transparent={false}
					visible={this.state.showModal}
					onRequestClose={() => this.toggleModal()}>
					<View style={styles.modal}>
						<Text style={styles.modalTitle}>Thank you for your application!</Text>
						<Text style={styles.modalText}>You will receive an email shortly confirming your submission.</Text>
						<Button
							onPress={() => {
								this.toggleModal();
								this.resetForm();
							}}
							color='#F9B5AC'
							title='Close'
						/>
					</View>
				</Modal>
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

export default Application;