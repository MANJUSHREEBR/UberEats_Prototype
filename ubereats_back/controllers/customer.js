/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const { errorHandler } = require('../helpers/dbErrorHandler');
const { pool } = require('../helpers/dbConnectionHandler');

exports.findCustomerById = (req, res, next, id) => {
  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'SELECT * FROM customers where id = ?',
        [id],
        (error, customer) => {
          if (error || !customer.length) {
            return res.status(400).json({
              error: errorHandler(err),

            });
          }
          req.profile = customer;
          conn.release();
          next();
        },
      );
    }
  });
};

exports.readCustomer = (req, res) => {
  req.profile.password = undefined;
  return res.json(req.profile[0]);
};

exports.updateCustomer = (req, res) => {
  const { id } = req.profile[0];
  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'UPDATE customers SET ? where id = ?',
        [req.body, id],
        (error, customer) => {
          if (error) {
            return res.status(400).json({
              error: errorHandler(error),

            });
          }
          customer.password = undefined;
          res.json({
            customer,
          });
          conn.release();
        },
      );
    }
  });
};
