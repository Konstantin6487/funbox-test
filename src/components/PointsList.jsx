import React from 'react';
import {
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { isEmpty } from 'lodash';

const PointsList = (props) => {
  const {
    locations,
    handleClick,
    onDragStart,
    onDragOver,
    setLocationCenter,
  } = props;

  if (isEmpty(locations)) {
    return <p>Локации отсутствуют</p>;
  }

  return (
    locations.map(({ id, address, position }, index) => (
      <InputGroup key={id} onDragOver={onDragOver(index)} className="mb-3">
        <Form.Control
          draggable
          onDragStart={onDragStart(index)}
          placeholder={`№${index + 1}❘${address}`}
          onClick={setLocationCenter(position)}
          readOnly
        />
        <InputGroup.Append>
          <Button title="Удалить локацию" variant="outline-secondary" onClick={handleClick(id)}>✘</Button>
        </InputGroup.Append>
      </InputGroup>
    ))
  );
};

export default PointsList;
