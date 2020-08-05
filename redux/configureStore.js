import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dogs } from './dogs';
import { favorites } from './favorites';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			dogs,
			favorites
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
}