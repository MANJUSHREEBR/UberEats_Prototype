const express = require('express');

const { findRestaurantById, readRestaurant, updateRestaurant } = require('../controllers/restaurant');
const { requireSignin, isAuthRestaurant, isRestaurant } = require('../controllers/userAuth');

const router = express.Router();

router.param('restaurantId', findRestaurantById);
router.get('/restaurant/:restaurantId', requireSignin, isAuthRestaurant, isRestaurant, readRestaurant);
router.put('/restaurant/:restaurantId', requireSignin, isAuthRestaurant, isRestaurant, updateRestaurant);

module.exports = router;
