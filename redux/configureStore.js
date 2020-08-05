import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dogs } from './dogs';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			dogs
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
}