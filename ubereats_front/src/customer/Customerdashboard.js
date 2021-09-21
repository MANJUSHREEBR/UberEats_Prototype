/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { isAuthenticated } from '../auth';

const Customerdashboard = () => {
  // const disPatch = useDispatch();
  const customerSigninInfo = useSelector((state) => state.customerSignin.customerSigninInfo);
  const {
    customer,
  } = customerSigninInfo;
  // const { customer } = isAuthenticated();
  const userLinks = () => (
    <div className="card">
      <h4 className="card-header">User links</h4>
      <ul className="list-group">
        <li className="list-group-item">
          <Link className="nav-link" to="/cart">My Cart</Link>
        </li>
        <li className="list-group-item">
          <Link className="nav-link" to="/cprofileUpdate">Update profile</Link>
        </li>
      </ul>
    </div>
  );
  const userInfo = () => (
    <div className="card mb-5">
      <h3>User Information</h3>
      <ul className="list-group">
        <li className="list-group-item">{ customer[0].name }</li>
      </ul>
    </div>
  );

  const purchaseHistory = () => (
    <div className="card mb-5">
      <h3>Orders</h3>
      <ul className="list-group">
        <li className="list-group-item">Orders</li>
      </ul>
    </div>
  );
  return (
    <div className="container">

      <div className="row">
        <div className="col-3">
          {userLinks()}
        </div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory()}
        </div>

      </div>
    </div>
  );
};
export default Customerdashboard;
