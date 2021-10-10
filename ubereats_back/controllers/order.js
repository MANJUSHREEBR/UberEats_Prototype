/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
// const { errorHandler } = require('../helpers/dbErrorHandler');
const { pool } = require('../helpers/dbConnectionHandler');

exports.create = (req, res) => {
  const orderdate = new Date();
  const address = JSON.stringify(req.body.cart.shippingAddress);
  const orderData = {
    customer_id: req.profile[0].id,
    restaurant_id: req.body.restaurantId,
    status: 'Order Received',
    orderdate,
    address,
  };

  pool.query('INSERT INTO orders SET ?', orderData, (err, result) => {
    if (err) {
      console.log('unable to insert the order', err);
      res.status(400).send('unable to insert the order');
    } else {
      const ordered_items = req.body.cart.cartItems;
      console.log(ordered_items);
      for (let i = 0; i < ordered_items.length; i++) {
        const orderedItemData = {
          order_Id: result.insertId,
          dish_Id: ordered_items[i].dish,
          quantity: ordered_items[i].qty,
          orderedprice: ordered_items[i].price,
        };
        pool.query('INSERT INTO orderdishes SET ?', orderedItemData, (
          err,
        ) => {
          if (err) {
            console.log('unable to insert ordered items', err);
            res.status(400).send('unable to insert ordered items');
          } else {
            console.log('ordered items added');
          }
        });
      }
      pool.query('DELETE FROM cart WHERE customer_id = ?', req.profile[0].id, (
        err,
      ) => {
        if (err) {
          console.log('unable to insert ordered items', err);
          res.status(400).send('unable to insert ordered items');
        } else {
          console.log('ordered items added');
        }
      });
      res.status(200).json({
        orderid: `${result.insertId} `,
      });
    }
  });
};

exports.orderById = (req, res, next, id) => {
  let orderObj = {};
  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'SELECT * FROM orders where orderid = ? ',
        [id],
        (error, order) => {
          if (error || !order.length) {
            return res.status(400).json({
              error: "Order doesn't exists",

            });
          }
          orderObj = order[0];
          conn.query(
            'SELECT * FROM orderdishes JOIN dishes ON orderdishes.dish_id = dishes.id where orderdishes.order_id = ? ',
            [orderObj.orderid],
            (error, orderDishes) => {
              if (error) {
                return res.status(400).json({
                  error: "Order doesn't exists",

                });
              }
              orderObj.cart = orderDishes;
              req.order = orderObj;
              next();
              conn.release();
            },
          );
        },
      );
    }
  });
};

exports.read = (req, res) => res.json(req.order);

exports.listOrders = (req, res) => {
  // const order = req.query.order ? req.query.order : 'ASC';
  // const sortBy = req.query.sortBy ? req.query.sortBy : 'id';
  // const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  // join dishes ON orderdishes.dish_id = dishes.id
  const { id } = req.profile[0];

  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'select * from orders JOIN restaurants ON orders.restaurant_id = restaurants.id where customer_id = ? GROUP BY orderid ORDER BY orderdate DESC',
        [id],
        (error, orders) => {
          if (error || !orders.length) {
            return res.status(400).json({
              error: 'no orders found',

            });
          }
          res.json({
            orders,
          });
          conn.release();
        },
      );
    }
  });
};

exports.listOrdersByRestaurantId = (req, res) => {
  // const order = req.query.order ? req.query.order : 'ASC';
  // const sortBy = req.query.sortBy ? req.query.sortBy : 'id';
  // const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  // join dishes ON orderdishes.dish_id = dishes.id
  const { id } = req.restaurant[0];
  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'select * from orders JOIN customers ON orders.customer_id = customers.id where restaurant_id = ? ORDER BY orderdate DESC',
        [id],
        (error, orders) => {
          if (error || !orders.length) {
            return res.status(400).json({
              error: 'orders not found',

            });
          }
          res.json({
            orders,
          });
          conn.release();
        },
      );
    }
  });
};

exports.changeOrderStatus = (req, res) => {
  // const order = req.query.order ? req.query.order : 'ASC';
  // const sortBy = req.query.sortBy ? req.query.sortBy : 'id';
  // const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  // join dishes ON orderdishes.dish_id = dishes.id
  const id = req.order.orderid;

  pool.getConnection((err, conn) => {
    if (err) {
      res.send('Error occured');
    } else {
      conn.query(
        'UPDATE orders SET status = ? where orderid = ?',
        [req.body.status, id],
        (error, orders) => {
          if (error) {
            return res.status(400).json({
              error: 'orders not found',

            });
          }
          res.json({
            orders,
          });
          conn.release();
        },
      );
    }
  });
};
