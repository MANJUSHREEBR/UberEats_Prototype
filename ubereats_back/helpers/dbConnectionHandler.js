const mysql = require('mysql');

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


