const express = require('express');
const { requireSignin, isAuth, isRestaurant } = require('../controllers/userAuth');

const { findCustomerById } = require('../controllers/customer');

const router = express.Router();

router.get('/secret/:customerId', requireSignin, isAuth, isRestaurant, (req, res) => {
  res.json({
    customer: req.profile,
  });
});

router.param('customerId', findCustomerById);

module.exports = router;
