/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Usersignin from './customer/Usersignin';
import Usersignup from './customer/Usersignup';
import Home from './core/Home';
import Menu from './core/Menu';
import Footer from './core/Footer';
// import PrivateRoute from './auth/PrivateRoute';
// import RestaurantPrivateRoute from './auth/RestaurantPrivateRoute';
import Customerdashboard from './customer/Customerdashboard';
import Resturantdashboard from './restaurant/Restaurantdashboard';
import Adddishes from './restaurant/Adddishes';
import DishComponent from './dishes/DishComponent';
import Cart from './cart/Cart';

const App = () => (
  <BrowserRouter>
    <Container>
      <Menu />
      <main className="py-3">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/customersignin" exact component={Usersignin} />
          <Route path="/customersignup" exact component={Usersignup} />
          <Route path="/customerdashboard" exact component={Customerdashboard} />
          <Route path="/restaurantdashboard" exact component={Resturantdashboard} />
          <Route path="/create/dishes" exact component={Adddishes} />
          <Route path="/dishes/:id" exact component={DishComponent} />
          <Route path="/cart/:id?" exact component={Cart} />
        </Switch>
        <Footer />
      </main>
    </Container>
  </BrowserRouter>
);

export default App;
