/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
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
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }
    let users = req.restaurant[0];
    users = _.extend(users, fields);
    const item = {};
    if (files.photo) {
      // if (files.photo.size > 1000000) {
      //   return res.status(400).json({
      //     error: 'Image size should be less than 1MB',
      //   });
      // }
      item.data = files.photo.path;
      item.contentType = files.photo.type;
    }
    users.photo = JSON.stringify(item);

    const { id } = req.restaurant[0];
    pool.getConnection((err, conn) => {
      if (err) {
        res.send('Error occured');
      } else {
        conn.query(
          'UPDATE restaurants SET ? where id = ?',
          [users, id],
          (error, customer) => {
            if (error) {
              return res.status(400).json({
                error: errorHandler(error),

              });
            }
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
                res.json({
                  customer,
                });
                conn.release();
              },
            );
          },
        );
      }
    });
  });
};

exports.list = (req, res) => {
  const order = req.query.order ? req.query.order : 'ASC';
  const sortBy = req.query.sortBy ? req.query.sortBy : 'id';
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'SELECT * FROM restaurants WHERE photo IS NOT NULL ORDER BY ? ? LIMIT ? ',
        [sortBy, order, limit],
        (error, restaurant) => {
          if (error || !restaurant.length) {
            return res.status(400).json({
              error: 'Rrestaurants not found',

            });
          }
          res.json({
            restaurant,
          });
          conn.release();
        },
      );
    }
  });
};

exports.photo = (req, res, next) => {
  const reqphoto = JSON.parse(req.restaurant[0].photo);
  if (req.restaurant) {
    res.writeHead(200, { 'Content-Type': reqphoto.contentType });
    fs.readFile(reqphoto.data,
      (err, content) => {
        // Serving the image
        res.end(content);
      });
  }
  next();
};
