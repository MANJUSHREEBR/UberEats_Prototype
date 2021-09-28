/* eslint-disable no-console */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
// const { errorHandler } = require('../helpers/dbErrorHandler');
const { pool } = require('../helpers/dbConnectionHandler');

exports.create = (req, res) => {
  const orderdate = new Date();

  const orderData = {
    customer_id: req.profile[0].id,
    restaurant_id: req.body.restaurantId,
    status: 'Order Received',
    orderdate,
  };

  pool.query('INSERT INTO orders SET ?', orderData, (err, result) => {
    if (err) {
      console.log('unable to insert the order', err);
      res.status(400).send('unable to insert the order');
    } else {
      const ordered_items = req.body.cart.cartItems;
      for (let i = 0; i < ordered_items.length; i++) {
        const orderedItemData = {
          order_Id: result.insertId,
          dish_Id: ordered_items[i].itemId,
          quantity: ordered_items[i].quantity,
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
      res.status(200).json({
        responseMessage: `Successfully placed the order. Order id : ${result.insertId} `,
      });
    }
  });
};
