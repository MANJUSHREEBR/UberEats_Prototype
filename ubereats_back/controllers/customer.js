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
