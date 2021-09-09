const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');



//import routes
const customerRoutes = require('./routes/customer')
require('dotenv').config();


//routes middleware
app.use(bodyParser.json());


app.use('/ubereats',customerRoutes);
app.use(cors());




const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on ${port}`))





