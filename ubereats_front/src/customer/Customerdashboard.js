/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-no-undef */
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
import locations from '../location';

const Customerdashboard = ({ history }) => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customerSignin);
  const {
    customerSigninInfo,
  } = customer || '';
  const { loadingFromState, errorFromState, successFromState } = useSelector((state) => state.customerUpdateProfile);
  let ImageApi = '';
  if (customerSigninInfo.customer[0].role === 1) {
    ImageApi = `${API}/restaurant/photo/${customerSigninInfo.customer[0].id}`;
  } else {
    ImageApi = `${API}/customer/photo/${customerSigninInfo.customer[0].id}`;
  }
  const [imageUrl, setImageUrl] = useState(ImageApi);
  const [values, setValues] = useState({
    name: customerSigninInfo ? customerSigninInfo.customer[0].name : '',
    email: customerSigninInfo ? customerSigninInfo.customer[0].email : '',
    phone: customerSigninInfo ? customerSigninInfo.customer[0].phone : '',
    location: customerSigninInfo ? customerSigninInfo.customer[0].location : '',
    nickname: customerSigninInfo ? customerSigninInfo.customer[0].nickname : '',
    loading: '',
    deliverymode: customerSigninInfo ? customerSigninInfo.customer[0].deliverymode : '',
    category: customerSigninInfo ? customerSigninInfo.customer[0].category : '',
    about: customerSigninInfo ? customerSigninInfo.customer[0].about : ' ',
    starttime: customerSigninInfo ? customerSigninInfo.customer[0].starttime : ' ',
    endtime: customerSigninInfo ? customerSigninInfo.customer[0].endtime : ' ',
    dob: customerSigninInfo ? customerSigninInfo.customer[0].dob : ' ',
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
    category,
    deliverymode,
    starttime,
    endtime,
    dob,
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
    // if (imageUrl === '') setImageUrl(`${API}/customer/photo/${customerSigninInfo.customer[0].id}`);
  }, [history, imageUrl]);

  // const { token, customer } = isAuthenticated();

  const clickSubmit = (e) => {
    e.preventDefault();
    setValues({
      ...values, error: '', loading: true,
    });
    let isCustomer = 'customer';
    if (customerSigninInfo.customer[0].role === 1) {
      isCustomer = 'restaurant';
    }
    dispatch(customerUpdateProfile(formData, customerSigninInfo.token, customerSigninInfo.customer[0].id, isCustomer));
    if (customerSigninInfo.customer[0].role === 1) {
      setImageUrl(`${API}/restaurant/photo/${customerSigninInfo.customer[0].id}`);
    } else setImageUrl(`${API}/customer/photo/${customerSigninInfo.customer[0].id}`);
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <p>Upload photo here</p>
      <div className="form-group">
        <label className="btn btn-success">
          <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" name="name" className="form-control" value={name} />
      </div>
      {customerSigninInfo.customer[0].role === 0 && (
      <div className="form-group">
        <label className="text-muted">Nickname</label>
        <input onChange={handleChange('nickname')} type="text" name="nickname" className="form-control" value={nickname} />
      </div>
      )}
      {customerSigninInfo.customer[0].role === 0 && (
      <div className="form-group">
        <label className="text-muted">Date Of birth</label>
        <input onChange={handleChange('dob')} type="date" name="dob" className="form-control" value={dob} />
      </div>
      )}
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
      {customerSigninInfo.customer[0].role === 1 && (
      <div className="form-group">
        <label className="text-muted">Delivery Mode</label>
        <select onChange={handleChange('deliverymode')} name="deliverymode" className="form-control" value={deliverymode}>
          <option>Select</option>
          <option value="Pickup">Pickup</option>
          <option value="Delivery">Delivery</option>
        </select>
      </div>
      )}
      {customerSigninInfo.customer[0].role === 1 && (
        <>
          <div className="form-group">
            <label className="text-muted"> Start Time </label>
            <input type="time" onChange={handleChange('starttime')} name="starttime" className="form-control" value={starttime} />
          </div>
          <div className="form-group">
            <label className="text-muted"> End Time </label>
            <input type="time" onChange={handleChange('endtime')} name="endtime" className="form-control" value={endtime} />
          </div>
        </>
      )}
      {customerSigninInfo.customer[0].role === 1 && (
      <div className="form-group">
        <label className="text-muted">Food Category</label>
        <select onChange={handleChange('category')} name="deliverymode" className="form-control" value={category}>
          <option>Select</option>
          <option value="Veg">Veg</option>
          <option value="Nonveg">Nonveg</option>
          <option value="Vegan">Vegan</option>
        </select>
      </div>
      )}
      <div className="form-group">
        <label className="text-muted">Location</label>
        <select onChange={handleChange('location')} name="location" className="form-control" value={location}>
          <option>Select</option>
          {locations.map((loc) => (
            <option value={loc}>{loc}</option>
          ))}
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
  const showImage = () => (
    (
      <Image
        src={imageUrl}
        alt="Image not found"
        onError={(e) => { e.target.onerror = null; e.target.src = 'https://dummyimage.com/100.png/09f/fff'; }}
        fluid
        roundedCircle
      />
    )
  );
  return (
    <div className="row">
      <div className="col-md-4 offset-md-2">
        {/* {imageUrl === '' && (
        <Image
          src={`${API}/customer/photo/${customerSigninInfo.customer[0].id}`}
          alt="Image not found"
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://dummyimage.com/100.png/09f/fff'; }}
          fluid
          roundedCircle
        />
        )} */}
        {showError()}
        {showSuccess()}
        {showLoading()}
        {showImage()}
        {newPostForm()}
      </div>
    </div>
  );
};

export default Customerdashboard;
