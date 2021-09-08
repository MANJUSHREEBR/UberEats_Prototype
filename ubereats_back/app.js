const express = require('express')
const mysql = require('mysql')
const app = express();
require('dotenv').config();

//database connection
var db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'X43Bfb).YYCwGLrP',
    database: 'ubereatsDB'
});
//connect db
db.connect((error) => {
    if(error){
        throw(error);
    }
    else{
        console.log('Mysql DB connected');
    }

})


const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on ${port}`))





