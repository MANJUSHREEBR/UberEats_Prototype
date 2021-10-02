/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
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
  ToggleButton, Button,
} from 'react-bootstrap';
// import { getDishes } from './Apicore';
import CardComponent from '../core/CardComponent';
import { listRestaurants } from '../js/actions/restaurantAction';
import Checkbox from '../core/Checkbox';

const Home = ({ match }) => {
  const [filter, setfilter] = useState([]);
  let { keyword } = match.params;
  const dispatch = useDispatch();
  const restaurantList = useSelector((state) => state.restaurantList);
  let { loadingFromState, restaurants, errorFromState } = restaurantList;

  if (keyword !== undefined) {
    if (restaurants) {
      restaurants = restaurants.filter(
        (row) => row.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1
    || row.location.toLowerCase().indexOf(keyword.toLowerCase()) > -1
    || row.deliverymode.toLowerCase().indexOf(keyword.toLowerCase()) > -1,
      );
    }
  }
  if (filter.length) {
    restaurants = restaurants.filter(
      (row) => filter.includes(row.category.toLowerCase()),
    );
  }

  useEffect(() => {
    dispatch(listRestaurants());
  }, [dispatch, keyword, filter]);
  const radios = [
    { name: 'veg', value: '1' },
    { name: 'nonveg', value: '2' },
    { name: 'vegan', value: '3' },
  ];
  const [radValue, setRadValue] = useState('1');
  const handleFilters = (filters) => {
    setfilter(filters);
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
        {restaurants && restaurants.length === 0 && (
        <Col md={8}>
          <img src="https://www.ubereats.com/_static/fca2c1eff67cb98be2dcf69dacf95347.svg" />
          <h2>We didn't find matching </h2>
          <p>Try searching for somewher else instead</p>
          <Button variant="dark">Search All Restaurants</Button>
        </Col>
        )}
      </Row>
    </div>
  );
};

export default Home;
