/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import { createDishes } from './ApiRestaurant';

const Adddishes = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    dishtype: '',
    loading: '',
    error: '',
    createdDish: '',
    reDirectToProfile: false,
    formData: '',

  });
  const {
    name,
    description,
    price,
    dishtype,
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
    setValues({ ...values, formData: new FormData() });
  }, []);

  const { token, customer } = isAuthenticated();

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });
    console.log(formData);
    createDishes(customer[0].id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          const { result } = data;
          setValues({
            ...values,
            name: '',
            description: '',
            photo: '',
            price: '',
            dishtype: '',
            loading: false,
            error: false,
            createdDish: result.name,
          });
        }
      });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary">
          <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
        </label>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
      </div>
      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea onChange={handleChange('description')} type="text" className="form-control" value={description} />
      </div>
      <div className="form-group">
        <label className="text-muted">Price</label>
        <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
      </div>
      <div className="form-group">
        <label className="text-muted">Dishtype</label>
        <select onChange={handleChange('dishtype')} className="form-control">
          <option>Select</option>
          <option value="Appetizer">Appetizer</option>
          <option value="MainCourse">MainCourse</option>
          <option value="Beverage">Beverage</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>
      <button type="submit" className="btn btn-outline-primary">Create Dishes</button>
    </form>

  );

  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? 'block' : 'none' }}>
      {error}
    </div>
  );
  const showSuccess = () => (
    <div className="alert alert-info" style={{ display: createdDish ? 'block' : 'none' }}>
      <h5>{`${createdDish} is created`}</h5>
    </div>
  );
  const showLoading = () => (
    loading && (<div className="alert alert-success"><h2>Loading ... </h2></div>)
  );

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        {showLoading()}
        {showError()}
        {showSuccess()}
        {newPostForm()}
      </div>
    </div>
  );
};

export default Adddishes;
