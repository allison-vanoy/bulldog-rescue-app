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
			const availKey = action.payload.id;
			const availIndex = state.dogs.findIndex(dog => dog.id === availKey);
			const currentDogsAvail = state.dogs;
			currentDogsAvail[availIndex].details.status = "Available";
			return {...state, dogs: currentDogsAvail}

		case ActionTypes.ADD_PENDING:
			const pendingKey = action.payload.id;
			const pendingIndex = state.dogs.findIndex(dog => dog.id === pendingKey);
			const currentDogsPending = state.dogs;
			currentDogsPending[pendingIndex].details.status = "Pending Adoption";
			return {...state, dogs: currentDogsPending}
	
		case ActionTypes.ADD_ON_HOLD:
			const holdKey = action.payload.id;
			const holdIndex = state.dogs.findIndex(dog => dog.id === holdKey);
			const currentDogsHold = state.dogs;
			currentDogsHold[holdIndex].details.status = "On Hold";
			return {...state, dogs: currentDogsHold}
		
		case ActionTypes.ADD_ADOPTED:
			const adoptKey = action.payload.id;
			const adoptIndex = state.dogs.findIndex(dog => dog.id === adoptKey);
			const currentDogsAdopt = state.dogs;
			currentDogsAdopt[adoptIndex].details.status = "Adopted";
			return {...state, dogs: currentDogsAdopt}
	
		default:
			return state;
	}
	
};