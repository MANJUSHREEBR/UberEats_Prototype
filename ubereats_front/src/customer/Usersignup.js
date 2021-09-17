/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../auth';

const Usersignup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,
    isCustomer: 'customer',
    location: '',

  });
  const {
    name, email, password, error, success, isCustomer, location,
  } = values;

  const handleChange = (nameArg) => (event) => {
    setValues({ ...values, error: false, [nameArg]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    let user;
    if (isCustomer === 'customer') {
      user = {
        name, email, password,
      };
    } else {
      user = {
        name, email, password, location,
      };
    }
    signUp(user, isCustomer)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: '',
            email: '',
            password: '',
            error: '',
            location: '',
            success: true,
          });
        }
      });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <div className="switch switch-green">
          <input onChange={handleChange('isCustomer')} type="radio" className="switch-input radio-warning" name="userrole" value="customer" checked={isCustomer === 'customer'} />
          <label htmlFor="week2" className="switch-label switch-label-off" style={{ paddingLeft: '4px', paddingRight: '11px' }}>Customer</label>
          <input onChange={handleChange('isCustomer')} type="radio" className="switch-input" name="userrole" value="restaurant" checked={isCustomer === 'restaurant'} />
          <label htmlFor="month2" className="switch-label switch-label-on" style={{ paddingLeft: '4px', paddingRight: '11px' }}>Restaurant</label>
          <span className="switch-selection" />
        </div>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
      </div>

      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
      </div>
      {isCustomer === 'restaurant' && (
      <div className="form-group">
        <label className="text-muted">Location</label>
        <input onChange={handleChange('location')} type="text" className="form-control" value={location} />
      </div>
      )}
      <button type="submit" className="btn btn-success" onClick={clickSubmit}>
        Submit
      </button>
    </form>
  );
  const showerror = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  );
  const showsucess = () => (
    <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
      signeup successfull!
      {' '}
      <Link to="/customersignin"> Signin here</Link>
    </div>
  );

  return (
    <div className="container col-md-8 offset-md-2">
      <img src="images/logo.png" alt="Uber Eats" style={{ height: '75px' }} />
      {showerror()}
      {showsucess()}
      {signUpForm()}
    </div>

  );
};

export default Usersignup;
