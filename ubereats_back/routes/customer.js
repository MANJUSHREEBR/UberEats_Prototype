const express = require('express');
const { customerSignup, customerSignin, customerSignout, requireSignin} = require('../controllers/customer');
const {signupValidator} = require('../validator')
const router = express.Router();



router.post('/customer/signup',signupValidator, customerSignup);
router.post('/customer/signin', customerSignin);
router.get('/customer/signout', customerSignout);


module.exports = router;