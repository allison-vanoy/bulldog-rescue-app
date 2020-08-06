import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Button, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
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
			adoptDate: ''
		}
	}

	handleSubmit() {
		console.log(JSON.stringify(this.state));

		this.setState({
			firstName: '',
			lastName: '',
			phone: '',
			email: '',
			dogName: '',
			adoptDate: ''
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
						placeholder='pjone number'
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
						color='#F9B5AC'
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
	}
})

export default Application;