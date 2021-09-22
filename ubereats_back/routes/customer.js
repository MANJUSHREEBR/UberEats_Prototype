const express = require('express');

const { findCustomerById, readCustomer, updateCustomer, photo } = require('../controllers/customer');
const { requireSignin, isAuth } = require('../controllers/userAuth');

const router = express.Router();

router.param('customerId', findCustomerById);
router.get('/customer/:customerId', requireSignin, isAuth, readCustomer);
router.put('/customer/:customerId', requireSignin, isAuth, updateCustomer);
router.get('/customer/photo/:customerId', photo);
module.exports = router;
