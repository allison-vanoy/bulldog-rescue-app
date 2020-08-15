import * as ActionTypes from './ActionTypes';

export const notifications = (state = [], action) => {
	switch (action.type) {
		case ActionTypes.ADD_NOTIFICATION:
			if (state.includes(action.payload)) {
				return state;
			}
			return state.concat(action.payload);

		default:
			return state;
	}
}