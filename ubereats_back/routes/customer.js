const express = require('express');

const {
  findCustomerById, readCustomer, updateCustomer,
  photo, addFavorites, getFavorites, addCart, getCartItems,
} = require('../controllers/customer');
const { requireSignin, isAuth } = require('../controllers/userAuth');
const { findRestaurantById } = require('../controllers/restaurant');

const router = express.Router();

router.param('customerId', findCustomerById);
router.param('restaurantId', findRestaurantById);
router.get('/customer/:customerId', requireSignin, isAuth, readCustomer);
router.put('/customer/:customerId', requireSignin, isAuth, updateCustomer);
router.get('/customer/photo/:customerId', photo);
router.post('/customer/addfav/:customerId/:restaurantId', requireSignin, isAuth, addFavorites);
router.get('/customer/favorites/:customerId', requireSignin, isAuth, getFavorites);
router.post('/customer/addcart/:customerId', requireSignin, isAuth, addCart);
router.get('/customer/cart/:customerId', requireSignin, isAuth, getCartItems);
module.exports = router;
