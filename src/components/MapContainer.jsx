import React, { Component } from 'react';
import { flip, isEmpty, last } from 'lodash';
import {
  InfoWindow,
  Map,
  Marker,
  Polyline,
} from 'google-maps-react';
import Waypoints from './Waypoints';
import * as selectors from '../selectors';
import connect from '../connect';
import connectMapApi from '../connectMapApi';

import './map-container.scss';

const mapStateToProps = (state, { mapsApi }) => ({
  activeMarker: selectors.getActiveMarker(state),
  isShowingError: selectors.getIsShowingErrorProp(state),
  locations: selectors.locationsSelector(state),
  selectedPlace: selectors.getSelectedPlace(state),
  showingInfoWindow: selectors.getShowingInfoWindow(state),
  mapsApi,
});

@connect(mapStateToProps)
@connectMapApi()
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.mapsApi = props.mapsApi || props.google;
  }

  onMapClicked = () => {
    const { showingInfoWindow, clickMap } = this.props;
    if (showingInfoWindow) {
      clickMap();
    }
  };

  onMarkerClick = (props, marker) => {
    const { clickMarker } = this.props;
    const { name } = props;
    const { position } = marker;
    clickMarker({ name, position });
  }

  onMarkerDragEnd = id => (coord) => {
    const { changeLocation } = this.props;
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const geocoder = new this.mapsApi.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      const address = status === 'OK' ? results[0].formatted_address : 'Unknown location';
      changeLocation({
        address,
        id,
        lat,
        lng,
      });
    });
  };

  render() {
    const {
      activeMarker,
      addLocation,
      changeErrorMessageDisplay,
      isShowingError,
      locations,
      removeLocation,
      selectedPlace,
      showingInfoWindow,
      updateLocations,
    } = this.props;

    const initialCenter = isEmpty(locations)
      ? undefined
      : { ...last(locations).position };

    return (
      <Map
        centerAroundCurrentLocation={!!navigator}
        className="map"
        containerStyle={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          height: '800px',
          position: 'relative',
        }}
        gestureHandling="greedy"
        google={this.mapsApi}
        initialCenter={initialCenter}
        onClick={this.onMapClicked}
        zoom={10}
      >
        <InfoWindow position={activeMarker} onClose={this.onMapClicked} visible={showingInfoWindow}>
          <div>
            <h1>{selectedPlace}</h1>
          </div>
        </InfoWindow>
        <Waypoints
          addLocation={addLocation}
          changeErrorMessageDisplay={changeErrorMessageDisplay}
          google={this.mapsApi}
          isShowingError={isShowingError}
          locations={locations}
          removeLocation={removeLocation}
          updateLocations={updateLocations}
        />
        <Polyline
          path={locations.map(item => item.position)}
          options={{
            icons: [{
              icon: 'hello',
              offset: '0',
              repeat: '10px',
            }],
            strokeColor: 'blue',
            strokeOpacity: 1,
            strokeWeight: 5,
          }}
        />
        {!isEmpty(locations)
          ? locations.map(({ address, id, position }) => (
            <Marker
              data-test="mark-test"
              draggable
              key={id}
              name={address}
              onClick={this.onMarkerClick}
              onDragend={flip(this.onMarkerDragEnd(id))}
              position={position}
            />
          ))
          : null
        }
      </Map>
    );
  }
}

export default MapContainer;
