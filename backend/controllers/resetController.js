const conn = require('../dbConnection')
const bcrypt = require("bcryptjs");
const { json } = require("express");


exports.updatePassword=async(req,res,next)=>{
    var resetToken = req.body.resetToken;
    var user_password = req.body.user_password;

    conn.execute('SELECT * FROM home_user WHERE resetToken ="' + resetToken + '"', function (err, result) {
        if (err) throw err;
        //console.log(result[0]);
        console.log(resetToken)
        console.log(user_password)

        if (result.length > 0) {
            var saltRounds = 10;
            bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(user_password, salt, function (err, hash) {
                    var data = {
                        user_password: hash
                    }
                    console.log(user_password)
                    conn.query('UPDATE home_user SET ? WHERE user_email ="' + result[0].user_email + '"', data, function (err, result) {
                        if (err) {
                        console.log(err)
                        }
                    });
                });
            });
            return res.status(200).json({ status: 1, message: "Successfully Updated" })
        } else {
            console.log(err)
            return res.status(400).json({ status: 0, message: "error" })

        }
    });
}