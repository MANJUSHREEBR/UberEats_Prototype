/* eslint-disable no-bitwise */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { signin, authenticate, isAuthenticated } from '../auth';
import { actionCreators } from '../js/actions';

const Usersignin = () => {
  const disPatch = useDispatch();
  const { customerSignin } = bindActionCreators(actionCreators, disPatch);

  const [values, setValues] = useState({
    email: 'kavyashree@gmail.com',
    password: 'kavya@123',
    isCustomer: 'customer',
  });
  const {
    email, password,
    isCustomer,
  } = values;
  const handleChange = (nameArg) => (event) => {
    setValues({ ...values, error: false, [nameArg]: event.target.value });
  };
  const {
    loadingFromState, errorFromState, customerSigninInfo, successFromState,
  } = useSelector((state) => state.customer);
  const redirector = () => {
    if (successFromState) return <Redirect to="/home" />;
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    customerSignin({ email, password }, isCustomer);
    redirector();
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
    <div className="alert alert-danger" style={{ display: errorFromState ? '' : 'none' }}>
      {errorFromState}
    </div>
  );
  const showLoading = () => (
    loadingFromState && (<div className="alert alert-info"><h2>Loading...</h2></div>)
  );

  return (
    <div className="container col-md-8 offset-md-2">
      <img src="images/logo.png" alt="Uber Eats" style={{ height: '75px' }} />
      {showerror()}
      {showLoading()}
      {signUpForm()}
    </div>

  );
};

export default Usersignin;
