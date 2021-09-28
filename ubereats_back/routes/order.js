const express = require('express');

const router = express.Router();

const {
  create,
} = require('../controllers/order');
const { requireSignin, isAuth } = require('../controllers/userAuth');
// const { findRestaurantById } = require('../controllers/restaurant');

router.post('/order/create', requireSignin, isAuth, create);

// router.param('restaurantId', requireSignin, findRestaurantById);
// router.param('dishId', dishesById);

module.exports = router;
