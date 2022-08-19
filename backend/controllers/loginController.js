const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const conn = require('../dbConnection').promise();


exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    let status = false
    if (!errors.isEmpty()) {
        return res.status(422).json({ status, errors: errors.array() });
    }
    try {
        const [row] = await conn.execute(
            "SELECT * FROM `home_user` WHERE `user_email`=?",
            [req.body.user_email]
        );

        if (row.length === 0) {
            status = false
            return res.status(422).json({
                status,
                message: "Invalid!!",
            });

        }
        const passMatch = await bcrypt.compare(req.body.user_password, row[0].user_password);
        if (!passMatch) {

            return res.status(422).json({
                status,
                message: "Incorrect password",
            });
        }
        else {
            const role = row[0].user_role
            const token = jwt.sign({ user_id: row[0].user_id }, 'the-super-strong-secrect', { expiresIn: '1h' });
            status = true
            return res.json({ status, token, role, user_id: row[0].user_id, user_email: row[0].user_email, user: row[0].user_name });
        }
    }
    catch (err) {
        next(err);
    }
}
