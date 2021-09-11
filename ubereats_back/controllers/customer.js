
const {encrypt, decrypt} = require('../helpers/EncryptHandler');
const {pool} = require('../helpers/dbConnectionHandler');
const {errorHandler} = require('../helpers/dbErrorHandler');
const jwt = require('jsonwebtoken'); //to generate signed token
const expressJwt = require('express-jwt'); // for authorization check


exports.customerSignup = (req, res) => {
    const {username, password,email} = req.body;
    const hashedPassword = encrypt(password);

    pool.getConnection(function(err,conn){
        if(err){
            res.send('Error occured')
        }
        else{
         conn.query(
        "INSERT INTO customers (password, username, iv, email) VALUES (?,?,?,?)",
         [hashedPassword.password, username, hashedPassword.iv, email],
         (err, customer)=>{
             if(err)
                return res.status(400).json({
                    error: errorHandler(err)
                   
                })
            res.json({
                customer
            })
            conn.release();
         })
        }

    })
}

exports.customerSignin = (req, res) => {
    const {email, password} = req.body;
    pool.getConnection(function(err,conn){
        if(err){
            res.send('Error occured')
        }
        else{
         conn.query(
        "SELECT password,iv,id FROM customers where email = ? ",
         [email],
         (err, customer)=>{
             if(err || !customer.length)
                return res.status(400).json({
                    error: "User with email doesn't exists, Please signup"
                   
                })
                
                
            if(password != decrypt({'iv': customer[0].iv, 'password': customer[0].password})){
                return res.status(401).json({
                    error: "Invalid username/ password, please signup !"
                   
                })
            }
            
            // //if user is found authenticate the user 
            const token = jwt.sign({_id: customer[0].id}, process.env.JWT_SECRET)
             res.cookie('tk', token,{expire: new Date() + 9999});
             res.json({token, customer})
             conn.release();
         })
        }

    })
}

exports.customerSignout = (req, res) => {
    res.clearCookie('tk')
    res.json({message: "Signout Success"})

}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRTE || "dfhkjkyskdgjdflhklk",
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });