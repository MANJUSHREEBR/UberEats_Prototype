const mysql = require('mysql');

exports.pool = mysql.createPool({
  host: 'ubereatsdb.cspmipfobrwn.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Manju123',
  database: 'ubereatsDB',
  port: 3306,
  debug: false,
  connectionLimit: 100,
  multipleStatements: true,
});
