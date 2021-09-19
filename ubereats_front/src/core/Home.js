/* eslint-disable no-undef */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import './Home.css';
import { getDishes } from './Apicore';
import Card from './Card';

const Home = () => {
  // const disheStore = useSelector((state) => state.customer.customerSigninInfo);
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(false);
  const loadDishes = () => {
    getDishes('id').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setDishes(data.dishes);
      }
    });
  };
  useEffect(() => {
    // disPatch(customerSigninInfo());
    loadDishes();
  }, []);

  // setDishes([]);

  return (
    <div className="container">
      <div className="row">
        {dishes.map((dish, i) => (<Card key={i} dish={dish} />))}
      </div>
    </div>
  );
};

export default Home;
