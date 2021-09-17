const express = require('express');

const router = express.Router();

const {
  create, dishesById, read, update, list, photo,
} = require('../controllers/dishes');
const { requireSignin, isAuth, isRestaurant } = require('../controllers/userAuth');
const { findRestaurantById } = require('../controllers/restaurant');

router.get('/dishes/:dishId', read);
router.post('/dishes/create/:restaurantId', requireSignin, isAuth, isRestaurant, create);
router.put('/dishes/:dishId/:restaurantId', requireSignin, isAuth, isRestaurant, update);
router.get('/dishes', list);
router.get('/dishes/photo/:dishId', photo);

router.param('restaurantId', findRestaurantById);
router.param('dishId', dishesById);

module.exports = router;
