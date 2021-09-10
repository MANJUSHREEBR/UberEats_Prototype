const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const cors = require('cors');
//import routes
const customerRoutes = require('./routes/customer')
require('dotenv').config();


// middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(expressValidator());

//routes
app.use('/ubereats',customerRoutes);
app.use(cors());




const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on ${port}`))





