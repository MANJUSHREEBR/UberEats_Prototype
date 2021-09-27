/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
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
import Checkbox from '../core/Checkbox';

const Home = ({ match }) => {
  // const [FinalRest, setFinalRest] = useState([]);
  let { keyword } = match.params;
  const dispatch = useDispatch();
  const restaurantList = useSelector((state) => state.restaurantList);
  let { loadingFromState, restaurants, errorFromState } = restaurantList;
  console.log(restaurants);
  if (keyword !== undefined) {
    restaurants = restaurants.filter(
      (row) => row.name.toLowerCase().indexOf(keyword) > -1
    || row.location.toLowerCase().indexOf(keyword) > -1,
    );
  }

  useEffect(() => {
    dispatch(listRestaurants());
  }, [dispatch, keyword]);
  const radios = [
    { name: 'veg', value: '1' },
    { name: 'Nonveg', value: '2' },
    { name: 'vegan', value: '3' },
  ];
  const [radValue, setRadValue] = useState('1');
  const handleFilters = (filters) => {
  };
  return (
    <div className="container">
      <Row>
        <Col md={3}>
          <h3>All stores</h3>
          <ul>
            <Checkbox categories={radios} handleFilters={(filters) => handleFilters(filters)} />
          </ul>

        </Col>
        {restaurants && restaurants.map((restaurant, i) => (
          <Col sm={8} md={4} lg={3} key={i}><CardComponent key={i} dish={restaurant} url="restaurant" /></Col>))}
      </Row>
    </div>
  );
};

export default Home;
