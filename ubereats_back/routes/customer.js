const express = require('express');
const { customerSignup, customerSignin} = require('../controllers/customer');
const {signupValidator} = require('../validator')
const router = express.Router();



router.post('/customer/signup',signupValidator, customerSignup);
router.post('/customer/signin', customerSignin);

module.exports = router;