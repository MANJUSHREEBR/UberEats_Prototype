/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { isAuthenticated } from '../auth';

const Customerdashboard = () => {
  const { customer } = isAuthenticated();
  return (
    <div className="container">
      <div className="card mb-5">
        <h3>User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{ customer[0].username }</li>
        </ul>
      </div>
      <div className="card mb-5">
        <h3>Orders</h3>
        <ul className="list-group">
          <li className="list-group-item">Orders</li>
        </ul>
      </div>
    </div>
  );
};
export default Customerdashboard;
