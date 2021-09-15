/* eslint-disable consistent-return */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */

import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated } from '../auth';

const Customersignin = () => {
  const [values, setValues] = useState({
    email: 'kavyashree@gmail.com',
    password: 'kavya@123',
    error: '',
    loading: false,
    redirectToReferrer: false,

  });
  const {
    email, password, error, loading, redirectToReferrer,
  } = values;
  const { customer } = isAuthenticated();
  const handleChange = (nameArg) => (event) => {
    setValues({ ...values, error: false, [nameArg]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              redirectToReferrer: true,
            });
          });
        }
      });
  };

  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} type="email" className="form-control" value={email} />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handleChange('password')} type="password" className="form-control" value={password} />
      </div>
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
  const showLoading = () => (
    loading && (<div className="alert alert-info"><h2>Loading...</h2></div>)
  );

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (customer && customer[0].role === '0') {
        return <Redirect to="/customerdashboard" />;
      }

      return <Redirect to="/restaurantdashboard" />;
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <div className="container col-md-8 offset-md-2">
      <img src="images/logo.png" alt="Uber Eats" style={{ height: '75px' }} />
      <div className="switch switch-blue">
        <input type="radio" className="switch-input radio-warning" name="userrole" value="customer" id="week2" checked />
        <label htmlFor="week2" className="switch-label switch-label-off">Customer</label>
        <input type="radio" className="switch-input" name="userrole" value="restaurant" id="month2" />
        <label htmlFor="month2" className="switch-label switch-label-on">Restaurant</label>
        <span className="switch-selection" />
      </div>
      {showerror()}
      {showLoading()}
      {signUpForm()}
      {redirectUser()}
    </div>

  );
};

export default Customersignin;
