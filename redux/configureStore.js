import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dogs } from './dogs';
import { favorites } from './favorites';
import { notifications } from './notifications';

export const ConfigureStore = () => {
	const store = createStore(
		combineReducers({
			dogs,
			favorites,
			notifications
		}),
		applyMiddleware(thunk, logger)
	);

	return store;
}