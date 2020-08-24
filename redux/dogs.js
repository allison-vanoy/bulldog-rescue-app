import * as ActionTypes from './ActionTypes';

export const dogs = (state = { isLoading: true, errMess: null, dogs: [] }, action) => {
	
	switch (action.type) {
		case ActionTypes.ADD_DOGS:
			return {...state, isLoading: false, errMess: null, dogs: action.payload};

		case ActionTypes.DOGS_LOADING:
			return {...state, isLoading: true, errMess: null, dogs: []};

		case ActionTypes.DOGS_FAILED:
			return {...state, isLoading: false, errMess: action.payload}

		case ActionTypes.ADD_DOG:
			return {...state, dogs: state.dogs.concat(action.payload)}

		case ActionTypes.ADD_AVAILABLE:
			const key = action.payload.id;
			const dogIndex = state.dogs.findIndex(dog => dog.id === key);
			const currentDogs = state.dogs;
			currentDogs[dogIndex].details.status = "Available";
			return {...state, dogs: currentDogs}

		default:
			return state;
	}
	
};