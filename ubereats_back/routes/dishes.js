const express = require('express');

const router = express.Router();

const {
  create, dishesById, read, update, list, photo, ListRestaurantDishes,
} = require('../controllers/dishes');
const { requireSignin, isAuthRestaurant, isRestaurant } = require('../controllers/userAuth');
const { findRestaurantById } = require('../controllers/restaurant');

router.get('/dishes/:dishId', read);
router.post('/dishes/create/:restaurantId', requireSignin, isAuthRestaurant, isRestaurant, create);
router.put('/dishes/:dishId/:restaurantId', requireSignin, isAuthRestaurant, isRestaurant, update);
router.get('/restaurant/dishes/:restaurantId', ListRestaurantDishes);
router.get('/dishes', list);
router.get('/dishes/photo/:dishId', photo);

router.param('restaurantId', findRestaurantById);
router.param('dishId', dishesById);

module.exports = router;
