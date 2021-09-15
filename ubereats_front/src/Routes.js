/* eslint-disable import/named */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Customersignin from './customer/Customersignin';
import Customersignup from './customer/Customersignup';
import Home from './core/Home';
import Menu from './core/Menu';
import PrivateRoute from './auth/PrivateRoute';
import Customerdashboard from './customer/Customerdashboard';

const Routes = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/customersignin" exact component={Customersignin} />
      <Route path="/customersignup" exact component={Customersignup} />
      <PrivateRoute path="/customerdashboard" exact component={Customerdashboard} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
