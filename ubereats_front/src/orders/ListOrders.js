/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button, Row, Col, ListGroup, Image, Card, Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getMyOrderList } from '../js/actions/orderAction';

const OrdeListOrders = () => {
  const dispatch = useDispatch();
  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading, orders, error } = myOrderList;
  console.log(orders[0]);

  useEffect(() => {
    dispatch(getMyOrderList());
  }, [dispatch]);
  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? 'block' : 'none' }}>
      {error}
    </div>
  );
  return (
    <>
      <Row>
        {showError()}
        <h2>My Orders</h2>
        <Col md={12}>
          <Table bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderid}>
                  <td>{order.orderid}</td>
                  <td>{order.orderdate.substring(0, 10)}</td>
                  <td>{order.status}</td>
                  <td>
                    <LinkContainer to={`/orders/${order.orderid}`}>
                      <Button variant="success" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

      </Row>

    </>
  );
};

export default OrdeListOrders;
