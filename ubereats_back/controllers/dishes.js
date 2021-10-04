/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable consistent-return */
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { pool } = require('../helpers/dbConnectionHandler');

exports.dishesById = (req, res, next, id) => {
  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'SELECT * FROM dishes where id = ? ',
        [id],
        (error, dish) => {
          if (error || !dish.length) {
            return res.status(400).json({
              error: "User with email doesn't exists, Please signup",

            });
          }
          req.dish = dish;
          next();
          conn.release();
        },
      );
    }
  });
};

exports.create = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = './uploads';
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }
    // check for all fields
    const { name, description, price } = fields;
    if (!name || !description || !price) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }
    const dishes = fields;
    const item = {};
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image size should be less than 1MB',
        });
      }
      item.data = files.photo.path;
      item.contentType = files.photo.type;
    }
    dishes.photo = JSON.stringify(item);
    dishes.restaurant_id = req.restaurant[0].id;
    pool.getConnection((err, conn) => {
      if (err) {
        res.send('Error occured');
      } else {
        conn.query(
          'INSERT INTO dishes SET ?',
          [dishes],
          (error, result) => {
            if (error) {
              return res.status(400).json({
                error: errorHandler(error),

              });
            }
            result.name = dishes.name;
            res.json({
              result,
            });
            conn.release();
          },
        );
      }
    });
  });
};

exports.read = (req, res) => {
  req.dish[0].photo = undefined;
  return res.json(req.dish);
};

exports.update = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.uploadDir = './uploads';
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }
    // check for all fields
    // const { name, description } = fields;
    // if (!name || !description) {
    //   return res.status(400).json({
    //     error: 'All fields are required',
    //   });
    // }
    let dishes = req.dish[0];
    dishes = _.extend(dishes, fields);

    const item = {};
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image size should be less than 1MB',
        });
      }
      item.data = files.photo.path;
      item.contentType = files.photo.type;
    }
    dishes.photo = JSON.stringify(item);
    dishes.restaurant_id = req.restaurant[0].id;
    pool.getConnection((err, conn) => {
      if (err) {
        res.send('Error occured');
      } else {
        conn.query(
          'UPDATE dishes SET ? where id = ?',
          [dishes, req.dish[0].id],
          (error, result) => {
            if (error) {
              return res.status(400).json({
                error: errorHandler(error),

              });
            }
            res.json({
              result,
            });
            conn.release();
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
        'SELECT dishes.name FROM dishes ORDER BY ? ? LIMIT ? ',
        [sortBy, order, limit],
        (error, dishes) => {
          if (error || !dishes.length) {
            return res.status(400).json({
              error: 'dishes not found',

            });
          }
          res.json({
            dishes,
          });
          conn.release();
        },
      );
    }
  });
};

exports.ListRestaurantDishes = (req, res) => {
  // const order = req.query.order ? req.query.order : 'ASC';
  // const sortBy = req.query.sortBy ? req.query.sortBy : 'id';
  // const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const { id } = req.restaurant[0];

  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'SELECT * FROM dishes WHERE restaurant_id = ? ',
        [id],
        (error, dishes) => {
          if (error || !dishes.length) {
            return res.status(400).json({
              error: 'dishes not found',

            });
          }
          res.json({
            dishes,
          });
          conn.release();
        },
      );
    }
  });
};

exports.photo = (req, res, next) => {
  const reqphoto = JSON.parse(req.dish[0].photo);
  if (req.dish) {
    res.writeHead(200, { 'Content-Type': reqphoto.contentType });
    fs.readFile(reqphoto.data,
      (err, content) => {
        // Serving the image
        res.end(content);
      });
  }
  next();
};
