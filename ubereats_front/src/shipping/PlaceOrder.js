/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button, Row, Col, ListGroup, Image, Card,
} from 'react-bootstrap';
import { saveShippindAddress } from '../js/actions/cartActions';
import CheckoutSteps from '../core/Checkoutsteps';
import { API } from '../config';

const PlaceOrder = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;
  if (!shippingAddress) {
    history.push('/shipping');
  }
  const submitHandler = (e) => {
    e.preventDefault();
  };
  // calculate prices
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price
  * item.qty, 0));
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 35);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)
   + Number(cart.taxPrice)).toFixed(2);

  const placeOrderHandler = () => {

  };
  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p>
                <strong>Address: </strong>
                {' '}
                {cart.shippingAddress.address}
                ,
                {' '}

                {cart.shippingAddress.city}
                ,
                {' '}
                {cart.shippingAddress.postalCode}
                ,
                {' '}
                {cart.shippingAddress.country}
                ,
                {' '}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h4>Order Items</h4>
              {cart.cartItems.length === 0 ? (
                <div className="alert alert-danger">

                  Your cart is empty
                  {' '}
                  <Link to="/">Go Back</Link>
                </div>
              ) : (

                <ListGroup.Item variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item>
                      <Row>
                        <Col md={2}>
                          <Image src={`${API}/dishes/photo/${item.dish}`} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`dishes/${item.dish}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty}
                          {' '}
                          x
                          {' '}
                          {item.price}
                          {' '}
                          =
                          {' '}
                          $
                          {item.qty * item.price}
                        </Col>

                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Items:
                  </Col>
                  <Col>
                    $
                    {cart.itemsPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Shipping:
                  </Col>
                  <Col>
                    $
                    {cart.shippingPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Tax:
                  </Col>
                  <Col>
                    $
                    {cart.taxPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Total:
                  </Col>
                  <Col>
                    $
                    {cart.totalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-success"
                  disabled={cart.cartItems
                    .length === 0}
                  onClick={placeOrderHandler}
                >
                  Place order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
