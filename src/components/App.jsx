import React from 'react';
import {
  Col,
  Container,
  Navbar,
  Row,
} from 'react-bootstrap';
import MapContainer from './MapContainer';

import './app.scss';

const App = () => (
  <>
    <Navbar className="shadow" bg="primary" variant="dark">
      <Navbar.Brand href="http://github.com" title="Исходный код">Редактор маршрутов➢</Navbar.Brand>
    </Navbar>
    <Container>
      <Row>
        <Col />
        <Col sm={9}><MapContainer /></Col>
      </Row>
    </Container>
  </>
);

export default App;
