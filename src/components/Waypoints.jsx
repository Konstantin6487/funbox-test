import React, { PureComponent, createRef } from 'react';
import {
  Button,
  Form,
  InputGroup,
  Overlay,
  Tooltip,
} from 'react-bootstrap';
import update from 'immutability-helper';

import './waypoints.scss';

export default class Waypoints extends PureComponent {
  autocomplete = createRef();

  componentDidMount() {
    this.renderSearchBox();
    this.autocomplete.current.focus();
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleClick = id => () => {
    const { removeLocation } = this.props;
    removeLocation(id);
  }

  showHideError = () => {
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
      if (!place[0]) {
        this.showHideError();
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

  onDragStart = index => (e) => {
    const { locations } = this.props;
    this.draggedItem = locations[index];
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };

  onDragOver = index => () => {
    const { locations, updateLocations } = this.props;
    const draggedOverItem = locations[index];
    if (this.draggedItem.id === draggedOverItem.id) {
      return;
    }
    const passedLocations = locations.filter(location => location.id !== this.draggedItem.id);
    const updatedLocations = update(passedLocations, { $splice: [[index, 0, this.draggedItem]] });
    updateLocations(updatedLocations);
  };

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
          <Form.Control className="waypoints-form-input" v-model="location" ref={this.autocomplete} />
        </Form.Group>
        {locations.map(({ id, address }, index) => (
          <InputGroup key={id} onDragOver={this.onDragOver(index)} className="mb-3">
            <Form.Control
              draggable
              onDragStart={this.onDragStart(index)}
              placeholder={`№${index + 1}❘${address}`}
              readOnly
            />
            <InputGroup.Append>
              <Button title="Удалить локацию" variant="outline-secondary" onClick={this.handleClick(id)}>✘</Button>
            </InputGroup.Append>
          </InputGroup>
        ))}
      </Form>
    );
  }
}
