/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const formidable = require('formidable');
const { join } = require('path');
const _ = require('lodash');
const fs = require('fs');
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
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = './uploads';
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }
    let users = req.profile[0];
    users = _.extend(users, fields);
    const item = {};
    if (files.photo) {
      // if (files.photo.size > 50 * 1024 * 1024) {
      //   return res.status(400).json({
      //     error: 'Image size should be less than 1MB',
      //   });
      // }
      item.data = files.photo.path;
      item.contentType = files.photo.type;
      users.photo = JSON.stringify(item);
    }
    const { id } = req.profile[0];
    pool.getConnection((err, conn) => {
      if (err) {
        res.send('Error occured');
      } else {
        conn.query(
          'UPDATE customers SET ? where id = ?',
          [users, id],
          (error, customer) => {
            if (error) {
              return res.status(400).json({
                error: errorHandler(error),

              });
            }
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
                res.status(200).json({
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
exports.photo = (req, res, next) => {
  const reqphoto = JSON.parse(req.profile[0].photo);
  if (req.profile) {
    res.writeHead(200, { 'Content-Type': reqphoto.contentType });
    fs.readFile(reqphoto.data,
      (err, content) => {
        // Serving the image
        res.end(content);
      });
  }
  next();
};

exports.addFavorites = (req, res) => {
  const { id } = req.profile[0];
  const restId = req.restaurant[0].id;

  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'INSERT INTO favorites (customer_id, restaurant_id) VALUES (?,?)',
        [id, restId],
        (error, customer) => {
          if (error) {
            return res.status(400).json({
              error: errorHandler(error),

            });
          }
          req.profile = customer;
          res.status(200).json({
            Success: 'Favorites saved successfully',
          });
          conn.release();
        },
      );
    }
  });
};
exports.getFavorites = (req, res) => {
  const { id } = req.profile[0];
  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'SELECT * FROM favorites JOIN restaurants ON  favorites.restaurant_id = restaurants.id WHERE favorites.customer_id = ?',
        [id],
        (error, favorites) => {
          if (error || !favorites.length) {
            return res.status(400).json({
              error: 'Favorites not found',

            });
          }
          res.json({
            favorites,
          });
          conn.release();
        },
      );
    }
  });
};

exports.addCart = (req, res) => {
  const { id } = req.profile[0];
  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'DELETE FROM cart WHERE customer_id = ?',
        [id],
        (error, response) => {
          if (error) {
            return response.status(400).json({
              error: 'carts not found',

            });
          }
          pool.getConnection((err, conn1) => {
            if (err) {
              res.send('Error occured');
            } else {
              // eslint-disable-next-line camelcase
              const ordered_items = req.body.cart.cartItems;
              for (let i = 0; i < ordered_items.length; i++) {
                const dishId = ordered_items[i].dish;
                const { qty } = ordered_items[i];
                conn.query(
                  'INSERT INTO cart (customer_id, dish, qty) VALUES (?,?,?)',
                  [id, dishId, qty],
                  (error, cart) => {
                    if (error) {
                      return res.status(400).json({
                        error: errorHandler(error),
                      });
                    }
                    if (i === ordered_items.length - 1) {
                      res.status(200).json({
                        Success: 'cartItems saved successfully',
                      });
                    }
                  },
                );
              }
              conn1.release();
            }
          });
          conn.release();
        },
      );
    }
  });
};

exports.getCartItems = (req, res) => {
  const { id } = req.profile[0];
  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'SELECT * FROM cart JOIN dishes ON cart.dish = dishes.id WHERE cart.customer_id = ?',
        [id],
        (error, items) => {
          if (error || !items.length) {
            return res.status(400).json({
              error: 'Item not found',

            });
          }
          res.json({
            items,
          });
          conn.release();
        },
      );
    }
  });
};
