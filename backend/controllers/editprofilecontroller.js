const conn = require("../dbConnection");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../" + "Images"),

  filename: function (req, files, callback) {
    callback(null, files.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const UpdateProfile = async (req, res) => {
  if (!req.body && !req.files) {
    // console.log("fhjujhj");
    res.json({ status: 0 });
  }

  console.log("file", req.file);

  // let sql = ""

  if(req.file != undefined){
    sql = `UPDATE home_user SET user_name='${req.body.user_name}', user_contact=${req.body.user_contact}, user_email='${req.body.user_email}', user_address='${req.body.user_address}',user_photo='${req.file.filename}' WHERE user_id=${req.params.user_id}`
  }
  else{
    sql = `UPDATE home_user SET user_name='${req.body.user_name}', user_contact=${req.body.user_contact}, user_email='${req.body.user_email}', user_address='${req.body.user_address}' WHERE user_id=${req.params.user_id}`
  }

  try {
    conn.execute(
      sql,
      (err, results) => {
        if (!err) {
          return res
            .status(200)
            .json({
              message: "The user data is successfully Updated.",
              results,
            });
        } else null, results;
        {
          console.log(err);
          return res.status(500).json(err);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = { UpdateProfile, upload };
