const express = require('express');

const { findCustomerById, readCustomer, updateCustomer } = require('../controllers/customer');
const { requireSignin, isAuth } = require('../controllers/userAuth');

const router = express.Router();

router.param('customerId', findCustomerById);
router.get('/customer/:customerId', requireSignin, isAuth, readCustomer);
router.put('/customer/:customerId', requireSignin, isAuth, updateCustomer);

module.exports = router;
