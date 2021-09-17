/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
// import styles from './Home.module.css';
import './Home.css';
import Layout from './Footer';
import { getDishes } from './Apicore';

const Home = () => {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(false);
  const loadDishes = () => {
    getDishes('id').then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setDishes(data);
      }
    });
  };
  useEffect(() => {
    loadDishes();
  }, []);
  return (
    <div>
      <Layout />
    </div>
  );
};

export default Home;
