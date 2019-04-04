import React from 'react';
import {
  Col,
  Container,
  Navbar,
  Row,
} from 'react-bootstrap';
import MapContainer from './MapContainer';

import './app.scss';

const App = props => (
  <>
    <Navbar className="shadow" bg="primary" variant="dark">
      <Navbar.Brand href="https://github.com/Konstantin6487/funbox-test" title="Исходный код...">Редактор маршрутов°</Navbar.Brand>
    </Navbar>
    <Container>
      <Row>
        <Col />
        <Col md={8} xl={9}><MapContainer {...props} /></Col>
      </Row>
    </Container>
  </>
);

export default App;
