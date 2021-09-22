/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const formidable = require('formidable');
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
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image size should be less than 1MB',
        });
      }
      item.data = files.photo.path;
      item.contentType = files.photo.type;
    }
    users.photo = JSON.stringify(item);

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
            customer.password = undefined;
            res.json({
              customer,
            });
            conn.release();
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
