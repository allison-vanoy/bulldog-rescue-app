import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchDogs = () => dispatch => {

	dispatch(dogsLoading());

	return fetch(baseUrl + 'dogs') 
		.then(response => {
				if (response.ok) {
					return response;
				} else {
					const error = new Error(`Error ${response.status}: ${response.text}`);
					error.response = response;
					throw error;
				}
			},
			error => {
				const errMess = new Error(error.message);
				throw errMess;
			}
		)
		.then(response => response.json())
		.then(dogs => dispatch(addDogs(dogs)))
		.catch(error => dispatch(dogsFailed(error.message)));
}

export const dogsLoading = () => ({
	type: ActionTypes.DOGS_LOADING
});

export const dogsFailed = errMess => ({
	type: ActionTypes.DOGS_FAILED,
	payload: errMess
});

export const addDogs = dogs => ({
	type: ActionTypes.ADD_DOGS,
	payload: dogs
});

export const postDog = (name, images, status, weight, age, gender, about) => dispatch => {
	const newDog = {
		name,
		images,
		details: {
			status,
			weight,
			age,
			gender,
			about
		}
	};

	return fetch(baseUrl + 'dogs', {
			method: "POST",
			body: JSON.stringify(newDog),
			headers: {
				"Content-type": "application/json"
			}
		})
		.then(response => {
			if (response.ok) {
				return response;
			} else {
				const error = new Error(`Error ${response.status}: ${response.statusText}`);
				error.response = response;
				throw error;
			}
		},
		error => { throw error; }
	)
	.then(response => response.json())
	.then(response => dispatch(addDog(response)))
	.catch(error => {
		console.log('post dog', error.message);
		alert(`This dog could not be submitted\nError: ${error.message}`);
	})
};

export const addDog = dog => ({
	type: ActionTypes.ADD_DOG,
	payload: dog
});

export const postToAvailable = dog => dispatch => {
	const availableDog = {
		status: "Available",
		weight: dog.details.weight,
		age: dog.details.age,
		gender: dog.details.gender,
		about: dog.details.about
	}

	return fetch(baseUrl + 'dogs/' + dog.id, {
			method: "PATCH",
			body: JSON.stringify({details: availableDog}),
			headers: {
				"Content-type": "application/json"
			}
		})
		.then(response => {
			if (response.ok) {
				return response;
			} else {
				const error = new Error(`Error ${response.status}: ${response.statusText}`);
				error.response = response;
				throw error;
			}
		},
		error => { throw error; }
	)
	.then(response => response.json())
	.then(response => dispatch(addAvailable(response)))
	.catch(error => {
		console.log('post to available', error.message);
		alert(`This dog could not be moved to available\nError: ${error.message}`);
	})
};

export const addAvailable = dog => ({
	type: ActionTypes.ADD_AVAILABLE,
	payload: dog
});

export const postToPending = dog => dispatch => {
	const availableDog = {
		status: "Pending Adoption",
		weight: dog.details.weight,
		age: dog.details.age,
		gender: dog.details.gender,
		about: dog.details.about
	}

	return fetch(baseUrl + 'dogs/' + dog.id, {
			method: "PATCH",
			body: JSON.stringify({details: availableDog}),
			headers: {
				"Content-type": "application/json"
			}
		})
		.then(response => {
			if (response.ok) {
				return response;
			} else {
				const error = new Error(`Error ${response.status}: ${response.statusText}`);
				error.response = response;
				throw error;
			}
		},
		error => { throw error; }
	)
	.then(response => response.json())
	.then(response => dispatch(addPending(response)))
	.catch(error => {
		console.log('post to available', error.message);
		alert(`This dog could not be moved to available\nError: ${error.message}`);
	})
};

export const addPending = dog => ({
	type: ActionTypes.ADD_PENDING,
	payload: dog
});

export const postToHold = dog => dispatch => {
	const availableDog = {
		status: "On Hold",
		weight: dog.details.weight,
		age: dog.details.age,
		gender: dog.details.gender,
		about: dog.details.about
	}

	return fetch(baseUrl + 'dogs/' + dog.id, {
			method: "PATCH",
			body: JSON.stringify({details: availableDog}),
			headers: {
				"Content-type": "application/json"
			}
		})
		.then(response => {
			if (response.ok) {
				return response;
			} else {
				const error = new Error(`Error ${response.status}: ${response.statusText}`);
				error.response = response;
				throw error;
			}
		},
		error => { throw error; }
	)
	.then(response => response.json())
	.then(response => dispatch(addOnHold(response)))
	.catch(error => {
		console.log('post to available', error.message);
		alert(`This dog could not be moved to available\nError: ${error.message}`);
	})
};

export const addOnHold = dog => ({
	type: ActionTypes.ADD_ON_HOLD,
	payload: dog
});

export const postToAdopted = dog => dispatch => {
	const availableDog = {
		status: "Adopted",
		weight: dog.details.weight,
		age: dog.details.age,
		gender: dog.details.gender,
		about: dog.details.about
	}

	return fetch(baseUrl + 'dogs/' + dog.id, {
			method: "PATCH",
			body: JSON.stringify({details: availableDog}),
			headers: {
				"Content-type": "application/json"
			}
		})
		.then(response => {
			if (response.ok) {
				return response;
			} else {
				const error = new Error(`Error ${response.status}: ${response.statusText}`);
				error.response = response;
				throw error;
			}
		},
		error => { throw error; }
	)
	.then(response => response.json())
	.then(response => dispatch(addAdopted(response)))
	.catch(error => {
		console.log('post to available', error.message);
		alert(`This dog could not be moved to available\nError: ${error.message}`);
	})
};

export const addAdopted = dog => ({
	type: ActionTypes.ADD_ADOPTED,
	payload: dog
});

export const postFavorite = dogId => dispatch => {
	dispatch(addFavorite(dogId));
};

export const addFavorite = dogId => ({
	type: ActionTypes.ADD_FAVORITE,
	payload: dogId
});

export const postNotification = dogId => dispatch => {
	dispatch(addNotification(dogId));
};

export const addNotification = dogId => ({
	type: ActionTypes.ADD_NOTIFICATION,
	payload: dogId
});