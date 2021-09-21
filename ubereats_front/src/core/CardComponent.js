/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* `${API}/dishes/photo/${dish.id}` */
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
// import { API } from '../config';
import ShowImage from './ShowImage';

const CardComponent = ({ dish }) => (
  <Card className="my-3 p-3 rounded">
    <Link to={`/dishes/${dish.id}`}>
      <ShowImage item={dish} url="dishes" />
    </Link>
    <Card.Body>
      <Card.Title as="div">
        <strong>
          {dish.name}
          {' '}
        </strong>
      </Card.Title>
      <Card.Text as="div">
        {dish.description}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default CardComponent;
