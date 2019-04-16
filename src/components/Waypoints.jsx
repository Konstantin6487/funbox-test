import React, { Component, createRef } from 'react';
import {
  Button,
  Form,
  InputGroup,
  Overlay,
  Tooltip,
} from 'react-bootstrap';
import update from 'immutability-helper';
import { memoize } from 'lodash';

import PointsList from './PointsList';

import './waypoints.scss';

export default class Waypoints extends Component {
  componentDidMount() {
    this.renderSearchBox();
  }

  autocomplete = createRef();

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleClick = memoize(id => () => {
    const { removeLocation } = this.props;
    removeLocation(id);
  })

  handleClearInput = () => {
    this.autocomplete.current.value = '';
  }

  onDragStart = memoize(index => (e) => {
    const { locations } = this.props;
    this.draggedItem = locations[index];
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  });

  onDragOver = memoize(index => () => {
    const { locations, updateLocations } = this.props;
    const draggedOverItem = locations[index];
    if (this.draggedItem.id === draggedOverItem.id) {
      return;
    }
    const passedLocations = locations.filter(location => location.id !== this.draggedItem.id);
    const updatedLocations = update(passedLocations, { $splice: [[index, 0, this.draggedItem]] });
    updateLocations(updatedLocations);
  });

  displayErrorMessage = () => {
    const { changeErrorMessageDisplay } = this.props;
    changeErrorMessageDisplay();
    setTimeout(changeErrorMessageDisplay, 5000);
  }

  renderSearchBox = () => {
    const { addLocation, google } = this.props;
    const searchbox = new google.maps.places.SearchBox(this.autocomplete.current);
    searchbox.addListener('places_changed', () => {
      const { map } = this.props;
      const place = searchbox.getPlaces();
      if (!place) {
        return;
      }
      if (!place[0]) {
        this.displayErrorMessage();
        return;
      }
      if (place[0].geometry.viewport) {
        map.fitBounds(place[0].geometry.viewport);
      } else {
        map.setCenter(place[0].geometry.location);
        map.setZoom(17);
      }
      const {
        formatted_address: address,
        geometry: {
          location: { lat, lng },
        },
      } = place[0];
      const newPlaceLat = lat();
      const newPlaceLng = lng();
      addLocation({ lat: newPlaceLat, lng: newPlaceLng, address });
    });
  }

  setLocationCenter = memoize(position => () => {
    const { map } = this.props;
    map.setCenter(position);
  })

  render() {
    const { locations, isShowingError } = this.props;
    return (
      <Form className="waypoints-form" onSubmit={this.handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Введите локацию:</Form.Label>
          <Overlay target={this.autocomplete.current} show={isShowingError} placement="bottom">
            {props => (
              <Tooltip id="overlay-example" {...props} show={props.show.toString()}>
                Локация не найдена
              </Tooltip>
            )}
          </Overlay>
          <InputGroup>
            <Form.Control
              autoFocus
              className="waypoints-form-input"
              data-test="waypoints"
              v-model="location"
              ref={this.autocomplete}
              placeholder="Любой географический объект"
            />
            <InputGroup.Append>
              <Button
                id="inputGroupAppend"
                onClick={this.handleClearInput}
                title="Очистить строку запроса"
                variant="outline-secondary"
              >
              ❮
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        <PointsList
          handleClick={this.handleClick}
          onDragStart={this.onDragStart}
          onDragOver={this.onDragOver}
          setLocationCenter={this.setLocationCenter}
          locations={locations}
        />
      </Form>
    );
  }
}
