/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Link, withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Container, Navbar, Nav, Card, NavDropdown,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signout } from '../auth';
import { logout } from '../js/actions/customerActions';

const Menu = ({ history }) => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customerSignin);
  const {
    customerSigninInfo,
  } = customer;
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand expand="lg">
            <Card.Img src="images/logo.png" variant="top" style={{ height: '75px' }} />
          </Navbar.Brand>
        </LinkContainer>
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
