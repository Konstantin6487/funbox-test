import { createAction } from 'redux-actions';

export const addLocation = createAction('LOCATION_ADD');
export const changeLocation = createAction('LOCATION_CHANGE');
export const removeLocation = createAction('LOCATION_REMOVE');
export const updateLocations = createAction('LOCATIONS_UPDATE');

export const changeErrorMessageDisplay = createAction('ERROR_MESSAGE_DISPLAY_CHANGE');
export const clickMap = createAction('MAP_CLICK');
export const clickMarker = createAction('MARKER_CLICK');
