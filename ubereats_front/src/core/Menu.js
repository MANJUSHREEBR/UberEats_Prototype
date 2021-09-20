/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import './Menu.css';
import '../style.css';
import { signout, isAuthenticated } from '../auth';

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
    {isAuthenticated() && (
    <li className="nav-item">
      <Link className="nav-link" to="/customerdashboard" style={isActive(history, '/customerdashboard')}> Dashboard</Link>
    </li>
    )}
    {isAuthenticated() && (
    <li className="nav-item">
      <Link className="nav-link" to="/restaurantdashboard" style={isActive(history, '/restaurantdashboard')}> Dashboard</Link>
    </li>
    )}
    {!isAuthenticated() && (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/customersignin" style={isActive(history, '/customersignin')}> Signin</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/customersignup" style={isActive(history, '/customersignup')}> Signup</Link>
      </li>
    </>
    )}
    {isAuthenticated() && (
    <li className="nav-item">
      <span
        className="nav-link"
        style={{ cursor: 'pointer', color: 'black' }}
        onClick={() => signout(() => {
          history.push('/');
        })}
      >
        Signout
      </span>
    </li>
    )}

  </ul>
);

export default withRouter(Menu);
