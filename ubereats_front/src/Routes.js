/* eslint-disable import/named */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Customersignin from './customer/Customersignin';
import Customersignup from './customer/Customersignup';
import Home from './core/Home';
import Menu from './core/Menu';

const Routes = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/customersignin" exact component={Customersignin} />
      <Route path="/customersignup" exact component={Customersignup} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
