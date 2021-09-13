/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signUp } from '../auth';

const Customersignup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false,

  });
  const {
    name, email, password, error, success,
  } = values;

  const handleChange = (nameArg) => (event) => {
    setValues({ ...values, error: false, [nameArg]: event.target.value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signUp({ username: name, email, password })
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
            success: true,
          });
        }
      });
  };

  const signUpForm = () => (
    <form>
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
      Successfullt signedup!
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

export default Customersignup;
