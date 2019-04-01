import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const initState = {
  activeMarker: {},
  isShowingError: false,
  selectedPlace: {},
  showingInfoWindow: false,
};

export default handleActions({
  [actions.changeErrorMessageDisplay](state) {
    return {
      ...state,
      isShowingError: !state.isShowingError,
    };
  },

  [actions.clickMarker](state, { payload: { name, position } }) {
    return {
      ...state,
      selectedPlace: { name },
      activeMarker: { position },
      showingInfoWindow: true,
    };
  },

  [actions.clickMap](state) {
    return {
      ...state,
      showingInfoWindow: false,
      activeMarker: {},
    };
  },
}, initState);
