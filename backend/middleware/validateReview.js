const conn = require('../dbConnection');

const validateReview = async (req, res, next) => {
  try {
    var validateReview = "SELECT * FROM home_review WHERE (user_id=? AND product_id = ?)";
    let {
      body: { user_id, product_id },
    } = req;

    conn.query(validateReview, [user_id, product_id], (err, result) => {
      if (err) res.send({ err: err });
      else if (result.length > 0) {
        res.send({ message: "Exists!!" });
      } else {
        next();
      }
    });
  } catch (error) {
    res.send({ err: error });
  }
};

module.exports = validateReview;
