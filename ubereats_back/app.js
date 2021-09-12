const express = require('express')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const cors = require('cors');
require('dotenv').config();

//import routes
const customerAuthRoutes = require('./routes/customerAuth')
const customerRoutes = require('./routes/customer')

const app = express();

// middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(expressValidator());

//routes
app.use('/ubereats',customerAuthRoutes);
app.use('/ubereats',customerRoutes);
app.use(cors());




const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on ${port}`))





