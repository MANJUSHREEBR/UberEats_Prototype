/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row, Col, ListGroup, Image, Form, Button, Card,
} from 'react-bootstrap';
import { addToCart } from '../js/actions/cartActions';
import RestaurantPrivateRoute from '../auth/RestaurantPrivateRoute';
import { API } from '../config';

const Cart = ({ match, location, history }) => {
  const dishId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();
  useEffect(() => {
    if (dishId) {
      dispatch(addToCart(dishId, qty));
    }
  }, [dispatch, qty, dishId]);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <Row>
      <Col md={8}>
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <div className="alert alert-danger">
            Your cart is empty!
            <Link to="/">
              Go back
            </Link>
          </div>
        ) : (

          <ListGroup variant="flush">
            {cartItems.map((item) => {
              <ListGroup.Item key={item.dish}>
                <Row>
                  <Col md={2}>
                    <Image src={`${API}/dishes/photo/${item.dish}`} alt={item.name} fluid rounded />

                  </Col>
                  <Col md={3}>
                    <Link to={`/dishes/${item.dish}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                    $
                    {item.price}
                  </Col>
                </Row>
              </ListGroup.Item>;
            })}
          </ListGroup>

        )}
        ;

      </Col>
      <Col md={2} />
      <Col md={2} />

    </Row>
  );
};

export default Cart;
