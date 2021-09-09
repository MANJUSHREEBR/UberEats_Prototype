const express = require('express');
const { customerSignup } = require('../controllers/customer');
const router = express.Router();



router.post('/customer/signup', customerSignup);

module.exports = router;