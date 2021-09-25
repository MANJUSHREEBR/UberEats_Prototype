/* eslint-disable react/no-array-index-key */
/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable import/named */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Col, Image, ListGroup, Card, Button, Form, Modal,
} from 'react-bootstrap';
import { getRestaurantDetails, RestaurantlistDishes } from '../js/actions/restaurantAction';
import CardComponent from '../core/CardComponent';
import { API } from '../config';

const RestaurantComponent = ({ history, match }) => {
  const dispatch = useDispatch();
  const restaurantDetails = useSelector((state) => state.restaurantDetails);
  const { loadingFromState, restaurant, errorFromState } = restaurantDetails;
  const restaurantDishList = useSelector((state) => state.restaurantDishList);
  const { restdishes } = restaurantDishList;

  useEffect(() => {
    dispatch(getRestaurantDetails(parseInt(match.params.id)));
    dispatch(RestaurantlistDishes(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      {/* <Link className="btn btn-success my-3" to="/"> Go Back</Link> */}
      <Row>
        <Col md={12}>
          <Image src={`${API}/restaurant/photo/${match.params.id}`} alt={restaurant.name} fluid style={{ width: '100%', height: '500px' }} />
        </Col>
      </Row>
      <Row>
        {restdishes && restdishes.map((dish, i) => (
          <Col sm={12} md={4} lg={3} key={i}><CardComponent key={i} dish={dish} /></Col>))}
      </Row>
    </>
  );
};

export default RestaurantComponent;
