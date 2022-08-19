const conn = require("../dbConnection");
const multer = require("multer");
const path = require("path");

var upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./Images");
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    },
  }),

  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(/*res.end('Only images are allowed')*/ null, false);
    }
    callback(null, true);
  },
});

const addProduct = async (req, res) => {
  /* console.log("req.body"); //form fields
    console.log(req.body);
    console.log("req.file");
    console.log(req.files); //form files */
  // simple validation
  if (!req.body && !req.files) {
    res.json({ status: 0 });
  } else {
    const query = conn.query(
      "INSERT INTO `home_product` (`user_id`, `product_name`,`product_category`, `product_description`, `product_price`, `product_discount`, `product_photo`,`product_status`) VALUES(?,?,?,?,?,?,?,?)",
      [
        //const [rows] = conn.execute('INSERT INTO `home_product`(`product_name`,`product_description`,`product_price`,`product_discount`,`product_photo`) VALUES(?,?,?,?,?)', [
        req.body.user_id,
        req.body.product_name,
        req.body.product_category,
        req.body.product_description,
        req.body.product_price,
        req.body.product_discount,
        req.files[0].path,
        "In Stock",
      ],
      (error, results) => {
        if (error) {
          console.log(error);
          //return error
          return res.status(404).json({
            status: 0,
            message: "Not Found.",
          });
        } else null, results;
        {
          return res.status(201).json({
            status: 1,
            message: "The Product data is successfully inserted.",
          });
        }
      }
    );
  }
};

module.exports = { upload, addProduct };
