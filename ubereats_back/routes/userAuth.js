const express = require('express');
const {
  customerSignup, customerSignin, customerSignout,
  restaurantSignup, restaurantSignin, restaurantSignout,
} = require('../controllers/userAuth');

const { signupValidator } = require('../validator');

const router = express.Router();

router.post('/customer/signup', signupValidator, customerSignup);
router.post('/customer/signin', customerSignin);
router.get('/customer/signout', customerSignout);
router.post('/restaurant/signup', signupValidator, restaurantSignup);
router.post('/restaurant/signin', restaurantSignin);
router.get('/restaurant/signout', restaurantSignout);

module.exports = router;
