import React, { Component, SFC } from 'react';
import 'typeface-roboto';
import './App.scss';
import HelmetConfig from './components/helmet/HelmetConfig';
import logo from './logo.svg';
import authenticatedAxios from './services/authenticatedAxios';
import { Container, Col, Row } from 'react-bootstrap';
import Menu from './components/Menu';

interface IAppProps {}

const App: SFC<IAppProps> = props => {
  return (
    <>
      <HelmetConfig title="Início" />

      <Container fluid id="main-container" className="h-100">
        <Row className="h-100">
          <Col xs={2} id="menu-section">
            <Menu />
          </Col>
          <Col xs={6} id="main-section">
            eae
          </Col>
          <Col xs={4} id="right-bar-section">
            eae
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
