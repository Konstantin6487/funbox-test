import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from 'redux';
import locations from './locations';
import locationsUi from './locationsUi';
import saver from '../actions/saver';

const reducers = combineReducers({
  locations,
  locationsUi,
});

const localStorageData = JSON.parse(localStorage.getItem('locations'));

/* eslint-disable */
const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

export default createStore(
  reducers,
  localStorageData || {},
  composeEnhancers(applyMiddleware(saver)),
);
