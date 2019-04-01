import { handleActions } from 'redux-actions';
import {
  isEmpty,
  keyBy,
  last,
  max,
  omit,
} from 'lodash';
import { last as lastChar } from 'voca';
import * as actions from '../actions';

const initState = {
  byId: {},
};

export default handleActions({
  [actions.addLocation](state, { payload: { lat, lng, address } }) {
    const { byId } = state;
    if (isEmpty(byId)) {
      return {
        byId: {
          point0: {
            id: 'point0',
            address,
            position: { lat, lng },
          },
        },
      };
    }

    const addresses = Object.values(byId).map(location => location.address);
    if (last(addresses) === address) {
      return state;
    }

    const prevLocationsIds = Object.keys(byId);
    const prevLocationsNums = prevLocationsIds.map(id => lastChar(id)).map(Number);
    const newLocationNum = max(prevLocationsNums) + 1;
    const newLocationId = `point${newLocationNum}`;
    const newLocation = {
      [newLocationId]: {
        id: newLocationId,
        address,
        position: { lat, lng },
      },
    };
    const prevLocations = byId;
    const updatedState = { byId: { ...prevLocations, ...newLocation } };
    return updatedState;
  },

  [actions.changeLocation]({ byId: prevLocations }, {
    payload: {
      address,
      id,
      lat,
      lng,
    },
  }) {
    const updatedLocation = { [id]: { id, address, position: { lat, lng } } };
    const updatedState = { byId: { ...prevLocations, ...updatedLocation } };
    return updatedState;
  },

  [actions.removeLocation]({ byId }, { payload }) {
    const omitted = omit(byId, payload);
    const updatedState = { byId: omitted };
    return updatedState;
  },

  [actions.updateLocations](state, { payload }) {
    const updatedState = { byId: keyBy(payload, 'id') };
    return updatedState;
  },
}, initState);
