/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check
const { encrypt, decrypt } = require('../helpers/EncryptHandler');
const { pool } = require('../helpers/dbConnectionHandler');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.customerSignup = (req, res) => {
  const { name, password, email } = req.body;
  const hashedPassword = encrypt(password);

  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'INSERT INTO customers (password, name, iv, email) VALUES (?,?,?,?)',
        [hashedPassword.password, name, hashedPassword.iv, email],
        (error, customer) => {
          if (error) {
            return res.status(400).json({
              error: errorHandler(error),

            });
          }
          res.json({
            customer,
          });
          conn.release();
        },
      );
    }
  });
};

exports.customerSignin = (req, res) => {
  const { email, password } = req.body;
  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'SELECT * FROM customers where email = ? ',
        [email],
        (err, customer) => {
          if (err || !customer.length) {
            return res.status(400).json({
              error: "User with email doesn't exists, Please signup",

            });
          }

          if (password != decrypt({ iv: customer[0].iv, password: customer[0].password })) {
            return res.status(401).json({
              error: 'Invalid name/ password, please signup !',

            });
          }

          // //if user is found authenticate the user
          const token = jwt.sign({ _id: customer[0].id }, process.env.JWT_SECRET);
          res.cookie('tk', token, { expire: new Date() + 9999 });
          res.json({ token, customer });
          conn.release();
        },
      );
    }
  });
};

exports.customerSignout = (req, res) => {
  res.clearCookie('tk');
  res.json({ message: 'Signout Success' });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRTE || 'dfhkjkyskdgjdflhklk',
  algorithms: ['HS256'], // added later
  userProperty: 'auth',
});

exports.isAuth = (req, res, next) => {
  const customer = req.profile && req.auth && req.profile[0].id === req.auth._id;
  if (!customer) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};
exports.isAuthRestaurant = (req, res, next) => {
  const restaurant = req.restaurant && req.auth && req.restaurant[0].id === req.auth._id;
  if (!restaurant) {
    return res.status(403).json({
      error: 'Access denied',
    });
  }
  next();
};
exports.isRestaurant = (req, res, next) => {
  if (req.restaurant[0].role !== 1) {
    return res.status(403).json({
      error: 'Restaurant resource! Access denied',
    });
  }
  next();
};

exports.restaurantSignup = (req, res) => {
  const {
    name, password, email, location,
  } = req.body;
  const hashedPassword = encrypt(password);

  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'INSERT INTO restaurants (password, name, iv, email,location) VALUES (?,?,?,?,?)',
        [hashedPassword.password, name, hashedPassword.iv, email, location],
        (error, customer) => {
          if (error) {
            return res.status(400).json({
              error: errorHandler(error),

            });
          }
          res.json({
            customer,
          });
          conn.release();
        },
      );
    }
  });
};

exports.restaurantSignin = (req, res) => {
  const { email, password } = req.body;
  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'SELECT * FROM restaurants where email = ? ',
        [email],
        (error, customer) => {
          if (error || !customer.length) {
            return res.status(400).json({
              error: "User with email doesn't exists, Please signup",

            });
          }

          if (password !== decrypt({ iv: customer[0].iv, password: customer[0].password })) {
            return res.status(401).json({
              error: 'Invalid name/ password, please signup !',

            });
          }

          // //if user is found authenticate the user
          const token = jwt.sign({ _id: customer[0].id }, process.env.JWT_SECRET);
          res.cookie('tk', token, { expire: new Date() + 9999 });
          res.json({ token, customer });
          conn.release();
        },
      );
    }
  });
};

exports.restaurantSignout = (req, res) => {
  res.clearCookie('tk');
  res.json({ message: 'Signout Success' });
};
