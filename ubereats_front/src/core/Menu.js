/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Menu.css';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: 'green' };
  }
  return { color: 'black' };
};

const Menu = ({ history }) => (

  <ul className="nav nav-tabs bg-warning ">
    <img src="images/logo.png" alt="Uber Eats" style={{ height: '75px' }} />
    <li className="nav-item">
      <Link className="nav-link" to="/" style={isActive(history, '/')}> Home</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/customersignin" style={isActive(history, '/customersignin')}> Signin</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/customersignup" style={isActive(history, '/customersignup')}> Signup</Link>
    </li>

  </ul>
);

export default withRouter(Menu);
