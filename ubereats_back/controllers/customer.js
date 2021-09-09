
const {encrypt, decrypt} = require('../EncryptHandler');
const {pool} = require('../dbConnection');

exports.customerSignup = (req, res) => {
    const {username, password,email} = req.body;
    const hashedPassword = encrypt(password);
    
    pool.query(
        "INSERT INTO customers (password, username, iv, email) VALUES (?,?,?,?)",
         [hashedPassword.password, username, hashedPassword.iv, email],
         (err, result)=>{
             if(err)
                console.log(err);
            res.send("Success");
         }
    )
}