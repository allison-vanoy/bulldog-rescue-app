import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Modal, CameraRoll, Image, FlatList } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postDog } from '../redux/ActionCreators';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';

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
			images: [],
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
		this.props.postDog(this.state.dogName, this.state.images, this.state.details.status, this.state.details.weight, this.state.details.age, this.state.details.gender, this.state.details.about);
	}

	resetForm() {
		this.setState({
			dogName: '',
			images: [],
			details: {
				status: '',
				weight: '',
				age: '',
				gender: '',
				about: ''
			}
		});
	}

	// add photos
	getImageFromCamera = async () => {
		const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
		const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
			const capturedImage = await ImagePicker.launchCameraAsync({
				allowsEditing: true,
				aspect: [1, 1]
			});
			if (!capturedImage.cancelled) {
				console.log('camera image location', capturedImage.uri);
				CameraRoll.saveToCameraRoll(capturedImage.uri);
				this.processImage(capturedImage.uri);
			}
		}
	}

	getImageFromGallery = async () => {
		const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (cameraRollPermission.status === 'granted') {
			const capturedImage = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [1, 1]
			});
			if (!capturedImage.cancelled) {
				console.log('gallery image location', capturedImage.uri);
				this.processImage(capturedImage.uri);
			}
		}
	}

	processImage = async (imgUri) => {
		const processedImage = await ImageManipulator.manipulateAsync(
			imgUri,
			[{ resize: { width: 400} }],
			{ format: ImageManipulator.SaveFormat.JPEG }
		);

		const dupState = {...this.state};
		dupState.images.push(processedImage.uri);
		this.setState(dupState);
	}
	// end adding photos


	render() {
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
						onValueChange={value => value !== 'default' ? this.setState({...this.state, details: {...this.state.details, status: value}}) : null}> 
						<Picker.Item label='select one...' value='default' />
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
						onValueChange={value => value !== 'default' ? this.setState({...this.state, details: {...this.state.details, gender: value}}) : null}>
						<Picker.Item label='select gender...' value='default' />
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
						title='Add Photo From Camera'
						onPress={this.getImageFromCamera}
						buttonStyle={styles.addCameraImageButton}
						titleStyle={styles.addImageButtonText}
					/>
				</View>
				<View style={styles.labelRow}>
					<Button
						title='Add Photo From Gallery'
						onPress={this.getImageFromGallery}
						buttonStyle={styles.addGalleryImageButton}
						titleStyle={styles.addImageButtonText}
					/>
				</View>
				<View style={styles.labelRow}>
					{
						this.state.images.map(image => {
							return (
								<Image
									style={this.state.images.length === 0 ? {height: 0} : styles.thumbnailImages}
									source={{uri: image}}
								/>
							)
						})
					}
				</View>
				<View style={styles.labelRow}>
					<Button
						onPress={() => {
							this.handleSubmit();
							this.resetForm();
							navigate('AvailableDogs')
						}}
						title='Save New Dog'
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
		width: 350,
		height: 35,
		backgroundColor: '#F9B5AC',
		borderWidth: 1,
		borderColor: '#F9B5AC',
		borderRadius: 25,
		marginTop: 20,
		marginBottom: 40
	},
	submitButtonText: {
		fontSize: 18,
		fontFamily: 'Roboto',
		textShadowColor: 'rgba(235, 87, 87, 0.5)',
		textShadowOffset: {width: 1, height: 2},
		textShadowRadius: 1
	},
	addCameraImageButton: {
		width: 250,
		height: 35,
		backgroundColor: '#D0D6B5',
		borderWidth: 1,
		borderColor: '#D0D6B5',
		borderRadius: 25,
		marginTop: 20
	},
	addGalleryImageButton: {
		width: 250,
		height: 35,
		backgroundColor: '#D0D6B5',
		borderWidth: 1,
		borderColor: '#D0D6B5',
		borderRadius: 25,
	},
	addImageButtonText: {
		fontSize: 18,
		fontFamily: 'Roboto',
		textShadowColor: 'rgba(109, 112, 95, 0.5)',
		textShadowOffset: {width: 1, height: 2},
		textShadowRadius: 1
	},
	thumbnailImages: {
		width: 85,
		height: 85,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(NewDog);