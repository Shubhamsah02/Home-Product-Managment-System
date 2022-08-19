const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const conn = require('../dbConnection').promise();
const nodemailer = require('nodemailer');
/*const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox44090f4b1bdb4e01a5c470e30179d6d3.mailgun.org';
const api_key = '1716690ae5cf0183a0c1d34cfd44ce6f-1b237f8b-e8a0e0a8'
const mg = mailgun({apiKey: api_key, domain: DOMAIN});*/
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "commonid4project@gmail.com",
        pass: "Volansys4password"
    }
})

exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ status: 0, errors: errors.array() });
    }

    try {

        const [row] = await conn.execute(
            "SELECT `user_email` FROM `home_user` WHERE `user_email`=?",
            [req.body.user_email],
        );

        const mailOption = {
            from: 'homeproduct@gmail.com',
            to: req.body.user_email,
            subject: 'Welcome to Online Home Product',
            text: `Hello ${req.body.user_name}, Thanks for choosing us. Make your beautiful home more beautiful by taking a branded item on our website.`
        }
        /*const data = {
        from: 'homeproduct@gmail.com',
        to: req.body.user_email,
        subject: 'Hello',
        text: 'you are successfully registered'
    };*/
        /*mg.messages().send(data, function (error, body) {
            console.log(body);
        });*/

        transport.sendMail(mailOption, function (err, data) {
            if (err) {
                console.log('error', err)
            } else {
                console.log("sent email")
            }
        })

        if (row.length > 0) {
            return res.status(208).json({
                status: 1,
                message: "Exists!!",
            });
        }

        const hashPass = await bcrypt.hash(req.body.user_password, 12);
        const IsVerified = "true";
        const resetToken = "";


        const [rows] = await conn.execute('INSERT INTO `home_user`(`user_name`,`user_email`,`user_password`,`user_contact`,`user_address`,`user_role`,`IsVerified`,`resetToken`) VALUES(?,?,?,?,?,?,?,?)', [
            req.body.user_name,
            req.body.user_email,
            hashPass,
            req.body.user_contact,
            req.body.user_address,
            req.body.user_role,
            IsVerified,
            resetToken

        ]);

        if (rows.affectedRows === 1) {
            return res.status(201).json({
                status: 1,
                message: "Inserted!!",
            });
        }
    } catch (err) {
        next(err);
    }
}