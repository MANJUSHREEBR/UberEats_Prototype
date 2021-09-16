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

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// routes
app.use('/ubereats', userAuthRoutes);
app.use('/ubereats', customerRoutes);


const port = process.env.PORT || 8000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server is running on ${port}`));
