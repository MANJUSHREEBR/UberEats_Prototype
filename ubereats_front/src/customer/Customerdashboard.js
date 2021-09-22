/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-const-assign */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';

// import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { API } from '../config';
import { customerUpdateProfile } from '../js/actions/customerActions';

const Customerdashboard = ({ history }) => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customerSignin);
  const {
    customerSigninInfo,
  } = customer;
  const { loadingFromState, errorFromState, successFromState } = useSelector((state) => state.customerUpdateProfile);
  const [values, setValues] = useState({
    name: customerSigninInfo.customer[0].name,
    email: customerSigninInfo.customer[0].email,
    phone: customerSigninInfo.customer[0].phone,
    location: customerSigninInfo.customer[0].location,
    nickname: customerSigninInfo.customer[0].nickname,
    loading: '',
    about: customerSigninInfo.customer[0].about,
    error: '',
    createdDish: '',
    reDirectToProfile: false,
    formData: '',

  });
  const {
    name,
    email,
    phone,
    nickname,
    location,
    about,
    loading,
    error,
    createdDish,
    reDirectToProfile,
    formData,
  } = values;

  const handleChange = (Argname) => (event) => {
    const value = Argname === 'photo' ? event.target.files[0] : event.target.value;
    formData.set(Argname, value);
    setValues({ ...values, [Argname]: value });
  };

  useEffect(() => {
    if (!customerSigninInfo) {
      history.push('./customersignin');
    }
    setValues({ ...values, formData: new FormData() });
  }, [history]);

  // const { token, customer } = isAuthenticated();

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: '', loading: true });
    dispatch(customerUpdateProfile(formData, customerSigninInfo.token, customerSigninInfo.customer[0].id));
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post photo</h4>
      <div className="form-group">
        <label className="btn btn-success">
          <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" name="name" className="form-control" value={name} />
      </div>
      <div className="form-group">
        <label className="text-muted">Nickname</label>
        <input onChange={handleChange('nickname')} type="text" name="nickname" className="form-control" value={nickname} />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input onChange={handleChange('email')} type="email" name="email" className="form-control" value={email} />
      </div>
      <div className="form-group">
        <label className="text-muted">Phone</label>
        <input onChange={handleChange('phone')} type="number" name="phone" className="form-control" value={phone} />
      </div>
      <div className="form-group">
        <label className="text-muted">About</label>
        <textarea onChange={handleChange('about')} type="number" name="number" className="form-control" value={about} />
      </div>
      <div className="form-group">
        <label className="text-muted">Location</label>
        <select onChange={handleChange('location')} name="location" className="form-control">
          <option>Select</option>
          <option value="Appetizer">San Jose</option>
          <option value="MainCourse">Santa Clara</option>
          <option value="Beverage">Sunnyvale</option>
          <option value="Dessert">Fremont</option>
        </select>
      </div>
      <button type="submit" className="btn btn-outline-success">Update Profile</button>
    </form>

  );

  const showError = () => (
    <div className="alert alert-danger" style={{ display: errorFromState ? 'block' : 'none' }}>
      {errorFromState}
    </div>
  );
  const showSuccess = () => (
    <div className="alert alert-info" style={{ display: successFromState ? 'block' : 'none' }}>
      <h5>Profile Successfully updated</h5>
    </div>
  );
  const showLoading = () => (
    loadingFromState && (<div className="alert alert-success"><h2>Loading ... </h2></div>)
  );

  return (
    <div className="row">
      <div className="col-md-4 offset-md-2">

        <Image src={`${API}/customer/photo/${customerSigninInfo.customer[0].id}`} alt="Please upload" fluid rounded />
      </div>

      <div className="col-md-8 offset-md-2">
        {showLoading()}
        {showError()}
        {showSuccess()}
        {newPostForm()}
      </div>
    </div>
  );
};

export default Customerdashboard;
