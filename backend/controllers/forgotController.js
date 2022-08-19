const conn = require('../dbConnection')
const nodemailer = require("nodemailer")
const randtoken = require('rand-token');
const bcrypt = require("bcryptjs");
const { json } = require("express");


function sendEmail(user_email, resetToken) {
    var user_email = user_email;
    var resetToken = resetToken;

    const mail = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        service: "gmail",
        auth: {
            user: "commonid4project@gmail.com",
            pass: "Volansys4password"
        }
    })
    var mailOptions = {
        from: 'homeproduct@gmail.com',
        to: user_email,
        subject: 'Reset Password Token',
        html: '<p>You requested for reset password, kindly use this token for reset your Password= ' + resetToken + ' </p>'

    };

    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log(0)
        }
    });

}
exports.resetPassword = async (req, res, next) => {
    var user_email = req.body.user_email;
    conn.query('SELECT * FROM home_user WHERE user_email ="' + user_email + '"', function (err, result) {
        if (err) throw err;
        console.log(user_email)
        //console.log(result[0]);
        try {
            if (result[0].user_email.length > 0) {
                /*var resetToken = randtoken.generate(20);
                console.log(resetToken)*/
                var num = '1234567890';
                var resetToken = '';
                for (let i = 0; i < 4; i++) {
                    resetToken += num[Math.floor(Math.random() * 10)];
                    console.log(resetToken)
                }
            
                var sent = sendEmail(user_email, resetToken);
                if (sent != '0') {
                    conn.query('UPDATE home_user SET resetToken ="' + resetToken + '" WHERE home_user.user_email = "' + user_email + '"', function (err, result) {
                        if (err) throw err

                    })
                    return res.status(200).json({ status: 1, message: "Successfully Sent" })
                }
            }
        }
        catch (err) {
            return res.status(404).json({ status: 0, message: "Not Exists!!" })

            }
        });
}