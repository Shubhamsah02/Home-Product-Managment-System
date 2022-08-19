const router = require("express").Router();
var express = require('express');
const conn = require("./dbConnection");
const { body } = require("express-validator");
const { register } = require("./controllers/registerController");
const { UpdateProfile } = require("./controllers/editprofilecontroller");

const { login } = require("./controllers/loginController");
const {Userdetailbyid,Updateaddress,} = require("./controllers/getUserController");
const { resetPassword } = require("./controllers/forgotController");
const { updatePassword } = require("./controllers/resetController");
const { upload, addProduct } = require("./controllers/productAddController");
const {viewProduct, ViewProductByUserId,randProduct,} = require("./controllers/viewProductController");
const { singleProduct } = require("./controllers/singleProductController");
const { authentication } = require("./middleware/authentication");
const vendorAddProduct = require("./controllers/productAddController");
const { sortPrice } = require("./controllers/sortPrice");
const { sortCategory } = require("./controllers/sortCategory");
const {ViewProductById,DeleteProduct,UpdateProduct,} = require("./controllers/productViewController");
const { OrderHistorybyId } = require("./controllers/orderhistorybyid");
const validateReview = require("./middleware/validateReview");
const {ratings,review,randReview,} = require("./controllers/ratingController");
const { addCart,viewCart, deleteCart,countCart, deleteAll,} = require("./controllers/cartController");
const { getVendor } = require("./controllers/getVendor");
const { viewUsers, getVendorID } = require("./controllers/viewUser");
const path = require('path');

router.get("/isAuth", authentication, (req, res) => {
  res.send({ login: true, msg: "done" });
});

router.post(
  "/register",
  [
    body("user_name", "The name must be of minimum 1 characters length")
      .notEmpty()
      .escape()
      .trim()
      .isLength({ min: 1 }),

    body("user_email", "Invalid email address")
      .notEmpty()
      .escape()
      .trim()
      .isEmail(),

    body("user_password", "The Password must be of minimum 4 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 4 }),

    body("user_contact", "The number must be of minimum 10 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 10 }),

    body("user_address", "enter your address").notEmpty().escape().trim(),

    body("user_role", "enter your role").notEmpty().escape().trim(),
  ],
  register
);

router.post(
  "/login",
  [
    body("user_email", "Invalid email address")
      .notEmpty()
      .escape()
      .trim()
      .isEmail(),

    body("user_password", "The Password must be of minimum 4 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 4 }),
  ],
  login
);

router.get("/getuser", authentication);

router.post(
  "/resetPassword",
  [
    body("user_email", "Invalid email address")
      .notEmpty()
      .escape()
      .trim()
      .isEmail(),
  ],
  resetPassword
);

router.post(
  "/updatePassword",
  [
    body("resetToken", "Invalid Token").notEmpty().isLength({ min: 4 }),

    body("user_password", "The Password must be of minimum 4 characters length")
      .notEmpty()
      .trim()
      .isLength({ min: 4 }),
  ],
  updatePassword
);

router.post("/addProduct", upload.any("product_photo"), addProduct);
router.get("/viewProduct", viewProduct);
router.post("/viewProduct/:product_id", singleProduct);
router.get("/sort/:product_price", sortPrice);
router.get("/sortCat/:product_category", sortCategory);
router.get("/getaddress/:user_id", Userdetailbyid);
router.post("/orders", (req, res) => {
  const {
    user_id,
    user_name,
    product_id,
    product_name,
    product_price,
    product_qty,
    day,
    payment_status,
    product_photo,
    vendor_id,
  } = req.body;
  const total = 0;
  console.log(req.body);

  for (let i = 0; i < req.body.length; i++) {
    const sql =
      "INSERT INTO `orders` (`user_id`, `user_name`, `product_id`, `product_name`, `product_price`, `product_qty`, `day`, `payment_status`, `product_photo`, `vendor_id`) VALUES (?,?,?,?,?,?,?,?,?,?)";
    conn.query(
      sql,
      [
        req.body[i].user_id,
        req.body[i].user_name,
        req.body[i].product_id,
        req.body[i].product_name,
        req.body[i].product_price,
        req.body[i].product_qty,
        req.body[i].day,
        "Not Paid",
        req.body[i].product_photo,
        req.body[i].vendor_id,
      ],
      (error, result) => {
        if (error) {
          console.log(error.message);
        } else {
          return {
            response: result,
          };
        }
      }
    );
  }
});
router.post("/changeStatus", (req, res) => {
  product_id = req.body.product_id;
  for (let i = 0; i < req.body.product_id.length; i++) {
    let sql = `UPDATE orders SET payment_status='Paid' WHERE product_id=${product_id[i]}`;
    conn.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).json({ msg: "Updated Successfully" });
      }
    });
  }
});

router.post("/changeProductStatus", (req, res) => {
  product_id = req.body.product_id;
  for (let i = 0; i < req.body.product_id.length; i++) {
    let sql = `UPDATE home_product SET product_status='Out of Stock' WHERE product_id=${product_id[i]}`;
    conn.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).send({ msg: "Updated Successfully" });
      }
    });
  }
});

console.log(__dirname)


// router.use('/images', express.static(path.join(__dirname, "/images")))

router.get("/viewProduct/:id", ViewProductById);
router.delete("/deleteProduct/:id", DeleteProduct);
router.post("/updateProduct/:id", UpdateProduct);
router.get("/orderhistory/:user_id", OrderHistorybyId);
// User Product Review

// router.post('/ratings', ratings)
router.get("/viewProductt/:user_id", ViewProductByUserId);

// User Product Review
router.post("/ratings/:product_id", validateReview, ratings);

// User View FeedBack
router.get("/review/:product_id", review);

// User Add Cart
router.post("/addcart/:product_id", addCart);

// User View Cart
router.get("/viewcart/:user_id", viewCart);

// User delete cart
router.delete("/deleteCart/:user_id/:product_id", deleteCart);
router.delete("/deleteAll/:user_id", deleteAll);

// User count in cart
router.get("/count/:user_id", countCart);

// Vendor can view user details
router.get("/viewusers/:vendor_id", viewUsers);

// get vendor
router.post("/getvendor/:product_id", getVendor);

// Random 3 Review
router.get("/rand/:product_id", randReview);

// Random 3 Product
router.get("/randP", randProduct);

//address update
router.put("/updateaddress/:user_id", Updateaddress);

// router.put("/updateprofile/:user_id", UpdateProfile);
router.put("/updateprofile/:user_id", upload.single("user_photo"), UpdateProfile);

module.exports = router;
