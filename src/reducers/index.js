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

const getStorageData = () => {
  const dataFromStorage = localStorage.getItem('locations');
  const parsed = JSON.parse(dataFromStorage);
  return parsed;
};

/* eslint-disable */
const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
/* eslint-enable */

export default createStore(
  reducers,
  getStorageData() || {},
  composeEnhancers(applyMiddleware(saver)),
);
