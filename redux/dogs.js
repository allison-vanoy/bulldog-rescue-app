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
			console.log('trying to add a new dog in the dogs reducer...')
			return {...state, dogs: state.dogs.concat(action.payload)}

		default:
			return state;
	}
	
};