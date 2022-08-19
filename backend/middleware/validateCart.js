const conn = require('../dbConnection');
const validateCart = async (req, res, next) => {
  try {
    var validateCart = "SELECT * FROM home_cart WHERE product_id = ?";
    let {
      body: {product_id },
    } = req;

    conn.query(validateCart, [product_id], (err, result) => {
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

module.exports = validateCart;