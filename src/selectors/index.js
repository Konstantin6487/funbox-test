import { createSelector } from 'reselect';

export const getActiveMarker = state => state.locationsUi.activeMarker.position;
export const getIsShowingErrorProp = state => state.locationsUi.isShowingError;
export const getLocations = state => state.locations.byId;
export const getSelectedPlace = state => state.locationsUi.selectedPlace.name;
export const getShowingInfoWindow = state => state.locationsUi.showingInfoWindow;

export const locationsSelector = createSelector(
  getLocations,
  locations => Object.values(locations),
);

export const positionsSelector = createSelector(
  locationsSelector,
  locations => locations.map(({ position }) => position),
);
