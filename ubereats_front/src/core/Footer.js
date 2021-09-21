/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer>
    <Container>
      <Row>
        <Col className="text-center py-3">Copyright &copy; Uber Eats</Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
