/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect } from 'react-dom';
import {
  Container, Navbar, Nav, Card, NavDropdown, ToggleButton, ButtonGroup, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../js/actions/customerActions';

const Menu = ({ history }) => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customerSignin);
  const [radioValue, setRadioValue] = useState('1');
  const {
    customerSigninInfo,
  } = customer;
  const logoutHandler = () => {
    dispatch(logout());
  };
  const radios = [
    { name: 'Delivery', value: '1' },
    { name: 'Pickup', value: '2' },
  ];
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand expand="lg">
            <Card.Img src="images/logo.png" variant="top" style={{ height: '75px' }} />
          </Navbar.Brand>
        </LinkContainer>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={idx % 2 ? 'outline-success' : 'outline-success'}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        {(customerSigninInfo
        && (
        <Button variant="light" rounded>
          <i className="fas fa-map-marker-alt" />
          {customerSigninInfo && customerSigninInfo.customer[0].location}
        </Button>
        )
        )}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {customerSigninInfo ? (
              <NavDropdown title={customerSigninInfo.customer[0].name} id="username">
                <LinkContainer to="/customerdashboard">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
              </NavDropdown>

            ) : (

              <LinkContainer to="/customersignin">
                <Nav.Link>
                  <i className="fas fa-user" />
                  Signin
                </Nav.Link>
              </LinkContainer>
            )}
            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart" />
                Cart
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Menu;
