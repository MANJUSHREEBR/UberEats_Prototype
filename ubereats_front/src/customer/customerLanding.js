/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Col, ButtonGroup,
  ToggleButton,
} from 'react-bootstrap';
// import { getDishes } from './Apicore';
import CardComponent from '../core/CardComponent';
import { listRestaurants } from '../js/actions/restaurantAction';

const Home = () => {
  const dispatch = useDispatch();
  const restaurantList = useSelector((state) => state.restaurantList);
  const { loadingFromState, restaurants, errorFromState } = restaurantList;
  useEffect(() => {
    dispatch(listRestaurants());
  }, [dispatch]);
  const radios = [
    { name: 'veg', value: '1' },
    { name: 'Nonveg', value: '2' },
    { name: 'vegan', value: '3' },
  ];
  const [radValue, setRadValue] = useState('1');
  return (
    <div className="container">
      <Row>
        <Col md={3}>
          <h3>All stores</h3>
        </Col>
        {restaurants && restaurants.map((restaurant, i) => (
          <Col sm={8} md={4} lg={3} key={i}><CardComponent key={i} dish={restaurant} url="restaurant" /></Col>))}
      </Row>
    </div>
  );
};

export default Home;
