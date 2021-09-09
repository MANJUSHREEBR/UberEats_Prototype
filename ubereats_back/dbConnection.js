const mysql = require('mysql');

//database connection
// db = mysql.createConnection({
//     host: 'localhost',
//     user: 'admin',
//     password: 'X43Bfb).YYCwGLrP',
//     database: 'ubereatsDB'
// });
// db.connect((error) => {
//     if(error){
//         throw(error);
//     }
//     else{
//         console.log('Mysql DB connected');
//     }

// })
exports.pool = mysql.createPool({
    host: "localhost",
    user: "admin",
    password: 'X43Bfb).YYCwGLrP',
    database: "ubereatsDB",
    port: 3306,
    debug: false,
    connectionLimit: 100,
    multipleStatements: true
  });


