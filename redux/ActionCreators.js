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