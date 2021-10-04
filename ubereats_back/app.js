/* eslint-disable import/prefer-default-export */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const cors = require('cors');

require('dotenv').config();

// import routes
const userAuthRoutes = require('./routes/userAuth');
const customerRoutes = require('./routes/customer');
const restaurantRoutes = require('./routes/restaurant');
const dishesRoutes = require('./routes/dishes');
const orderRoutes = require('./routes/order');

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, UPDATE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(cors());
// middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(expressValidator());

// routes
app.use('/ubereats', userAuthRoutes);
app.use('/ubereats', customerRoutes);
app.use('/ubereats', dishesRoutes);
app.use('/ubereats', restaurantRoutes);
app.use('/ubereats', orderRoutes);

const port = process.env.PORT || 8000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server is running on ${port}`));

module.exports = app;
