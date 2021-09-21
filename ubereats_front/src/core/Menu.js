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
  Container, Navbar, Nav, Card,
} from 'react-bootstrap';
import { signout } from '../auth';

// const isActive = (history, path) => {
//   if (history.location.pathname === path) {
//     return { color: 'green' };
//   }
//   return { color: 'black' };
// };

const Menu = ({ history }) => (
  <Navbar bg="light" expand="lg">
    <Container>
      <LinkContainer to="/">
        <Navbar.Brand expand="lg">
          <Card.Img src="images/logo.png" variant="top" style={{ height: '75px' }} />
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <LinkContainer to="/customersignin">
            <Nav.Link>
              <i className="fas fa-user" />
              Signin
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/customersignup"><Nav.Link>Signup</Nav.Link></LinkContainer>
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
// <>
//   <ul className="nav nav-tabs bg-warning ">
//     <img src="images/logo.png" alt="Uber Eats" style={{ height: '75px' }} />
//     <li className="nav-item">
//       <Link className="nav-link" to="/" style={isActive(history, '/')}> Home</Link>
//     </li>
//     <li className="nav-item">
//       <Link className="nav-link" to="/customerdashboard" style={isActive(history, '/customerdashboard')}> Dashboard</Link>
//     </li>

//     <li className="nav-item">
//       <Link className="nav-link" to="/restaurantdashboard" style={isActive(history, '/restaurantdashboard')}> Dashboard</Link>
//     </li>
//     <li className="nav-item">
//       <Link className="nav-link" to="/customersignin" style={isActive(history, '/customersignin')}> Signin</Link>
//     </li>
//     <li className="nav-item">
//       <Link className="nav-link" to="/customersignup" style={isActive(history, '/customersignup')}> Signup</Link>
//     </li>
//     <li className="nav-item">
//       <span
//         className="nav-link"
//         style={{ cursor: 'pointer', color: 'black' }}
//         onClick={() => signout(() => {
//           history.push('/');
//         })}
//       >
//         Signout
//       </span>
//     </li>

//   </ul>

// </>

export default Menu;
