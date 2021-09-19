/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router-dom';
import ShowImage from './ShowImage';

const Card = ({ dish }) => (
  <div className="col-4 mb-3">
    <div className="card">
      <div className="card-header">
        {dish.name}
      </div>
      <div className="card.body">
        <ShowImage item={dish} url="dishes" />
        <p>{dish.description}</p>
        <p>
          $
          {dish.price}
        </p>
        <Link to="/">
          <button className="btn btn-outline-success mt-2 mb-2" style={{ margin: '4px' }}>
            View Product
          </button>
        </Link>
        <button className="btn btn-outline-warning mt-2 mb-2">
          Add to Cart
        </button>

      </div>

    </div>

  </div>
);

export default Card;
