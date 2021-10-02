/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button, Row, Col, ListGroup, Image, Card,
} from 'react-bootstrap';
import { saveShippindAddress } from '../js/actions/cartActions';
import { API } from '../config';
import { getOrderDetails, updateOrderStatus } from '../js/actions/orderAction';

const Orders = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { orderItems, loading, error } = orderDetails;
  const { cart } = orderItems;
  const customer = useSelector((state) => state.customerSignin);
  const {
    customerSigninInfo,
  } = customer;
  const [selectorVal, setSelectorVal] = useState(orderItems.status);
  //   const { shippingAddress } = cart;
  // calculate prices
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  if (cart) {
    cart.itemsPrice = addDecimals(cart.reduce((acc, item) => acc + item.price
  * item.quantity, 0));
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 35);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)
   + Number(cart.taxPrice)).toFixed(2);
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch]);

  const statusUpdateHandler = (e) => {
    setSelectorVal(e.target.value);
    dispatch(updateOrderStatus({ status: e.target.value }, orderId));
  };
  return (
    <>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {/* <ListGroup.Item>
              <h4></h4>
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
            </ListGroup.Item> */}
            <ListGroup.Item>
              <h4>
                Order:
                {orderItems.orderid}
              </h4>
              <ListGroup.Item>
                <label className="text-muted">Change Status here</label>
                <select onChange={statusUpdateHandler} className="form-control" value={selectorVal}>
                  <option>Select</option>
                  <option value="Order Received">Order Received</option>
                  <option value="Processing">Processing</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </ListGroup.Item>
              {cart && cart.length === 0 ? (
                <div className="alert alert-danger">

                  Your cart is empty
                  {' '}
                  <Link to="/">Go Back</Link>
                </div>
              ) : (

                <ListGroup.Item variant="flush">
                  {cart && cart.map((item, index) => (
                    <ListGroup.Item>
                      <Row>
                        <Col md={2}>
                          <Image src={`${API}/dishes/photo/${item.id}`} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`dishes/${item.id}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity}
                          {' '}
                          x
                          {' '}
                          {item.price}
                          {' '}
                          =
                          {' '}
                          $
                          {item.quantity * item.price}
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
                    {cart && cart.itemsPrice}
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
                    {cart && cart.shippingPrice}
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
                    {cart && cart.taxPrice}
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
                    {cart && cart.totalPrice}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
                  {error}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Orders;
