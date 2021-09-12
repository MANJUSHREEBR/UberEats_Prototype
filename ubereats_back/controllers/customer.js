const {errorHandler} = require('../helpers/dbErrorHandler');
const {pool} = require('../helpers/dbConnectionHandler');

exports.findCustomerById = (req, res, next, id) => {
    pool.getConnection(function(err,conn){
        if(err){
            res.send('Error occured')
        }
        else{
         conn.query(
        "SELECT * FROM customers where id = ?",
         [id],
         (err, customer)=>{
             if(err || !customer.length)
                return res.status(400).json({
                    error: errorHandler(err)
                   
                })
            req.profile = customer
            conn.release()
            next()
         })
        }

    })


}