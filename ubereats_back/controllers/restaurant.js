/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const { errorHandler } = require('../helpers/dbErrorHandler');
const { pool } = require('../helpers/dbConnectionHandler');

exports.findRestaurantById = (req, res, next, id) => {
  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'SELECT * FROM restaurants where id = ?',
        [id],
        (error, customer) => {
          if (error || !customer.length) {
            return res.status(400).json({
              error: errorHandler(err),

            });
          }
          req.restaurant = customer;
          conn.release();
          next();
        },
      );
    }
  });
};

exports.readRestaurant = (req, res) => {
  req.restaurant[0].password = undefined;
  return res.json(req.restaurant[0]);
};

exports.updateRestaurant = (req, res) => {
  const { id } = req.restaurant[0];
  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'UPDATE restaurants SET ? where id = ?',
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
