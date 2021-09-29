const express = require('express');

const router = express.Router();

const {
  create, read, orderById, listOrders,
} = require('../controllers/order');
const { requireSignin, isAuth } = require('../controllers/userAuth');
const { findCustomerById } = require('../controllers/customer');

router.param('customerId', findCustomerById);
router.param('orderId', orderById);
router.get('/order/:orderId', read);
router.post('/order/create/:customerId', requireSignin, isAuth, create);
router.get('/orders/:customerId', listOrders);

module.exports = router;
