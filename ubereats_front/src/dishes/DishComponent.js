/* eslint-disable import/named */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Col, Image, ListGroup, Card, Button, Form, Modal,
} from 'react-bootstrap';
import { getDishDetails } from '../js/actions/dishActions';
import { API } from '../config';

const DishComponent = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const dishDetails = useSelector((state) => state.dishDetails);
  const { loadingFromState, dish, errorFromState } = dishDetails;
  const customer = useSelector((state) => state.customerSignin);
  const {
    customerSigninInfo,
  } = customer;
  useEffect(() => {
    dispatch(getDishDetails(parseInt(match.params.id)));
  }, [dispatch, match]);

  const addToCart = () => {
    history.push(`/cart/${parseInt(match.params.id)}?qty=${qty}`);
  };
  const decrement = () => {
    setQty(qty - 1);
  };
  const increment = () => {
    setQty(qty + 1);
  };
  const goback = () => {
    history.goBack();
  };
  const editDishes = () => {
    localStorage.setItem('EditDish', JSON.stringify(dish));
    history.push('/edit/dishes');
  };
  return (
    <>
      <Button className="btn btn-success my-3" onClick={goback}> Go Back</Button>
      <Row>
        <Col md={6}>
          <Image src={`${API}/dishes/photo/${match.params.id}`} alt={dish.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{dish.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Description:
              {dish.description}
              <hr />
              Price: $
              {dish.price}
            </ListGroup.Item>

          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>
                  Price:
                </Col>
                <Col>
                  <strong>
                    $
                    {dish.price}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Qty</Col>
                <Col>
                  <Button className="btn-block bg-success mr-2" disabled={qty <= 1} type="button" onClick={decrement}>
                    -
                  </Button>
                  {qty}
                  <Button className="btn-block bg-success" type="button" onClick={increment}>
                    +
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <strong>Total:</strong>
                  {' '}
                </Col>
                <Col>
                  <strong>{dish.price * qty}</strong>
                </Col>
              </Row>

            </ListGroup.Item>
            {customerSigninInfo && customerSigninInfo.customer[0].role === 0 && (
            <ListGroup.Item>
              <Button className="btn-block bg-success" type="button" onClick={addToCart}>
                Add To cart
              </Button>
            </ListGroup.Item>
            ) }
            {customerSigninInfo && customerSigninInfo.customer[0].role === 1 && (
            <ListGroup.Item>
              <Button className="btn-block bg-success" type="button" onClick={editDishes}>
                Edit dish
              </Button>
            </ListGroup.Item>
            ) }

          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default DishComponent;
