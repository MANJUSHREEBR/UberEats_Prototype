const express = require('express');

const router = express.Router();

const {
  create, read, orderById, listOrders, listOrdersByRestaurantId, changeOrderStatus,
} = require('../controllers/order');
const { requireSignin, isAuth } = require('../controllers/userAuth');
const { findCustomerById } = require('../controllers/customer');
const { findRestaurantById } = require('../controllers/restaurant');

router.param('customerId', findCustomerById);
router.param('orderId', orderById);
router.param('restaurantId', findRestaurantById);

router.get('/order/:orderId', read);
router.post('/order/create/:customerId', requireSignin, isAuth, create);
router.get('/orders/:customerId', listOrders);
router.get('/restaurant/orders/:restaurantId', listOrdersByRestaurantId);
router.put('/restaurant/orders/:orderId', changeOrderStatus);

module.exports = router;
