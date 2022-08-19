const conn = require("../dbConnection");

const Userdetailbyid = async (req, res) => {
  conn.execute(
    "SELECT * FROM home_user WHERE user_id=?",
    [req.params.user_id],
    function (err, result) {
      if (err) throw err;
      else {
        return res.status(200).json({
          status: 1,
          response: result,
        });
      }
    }
  );
};

const Updateaddress = async (req, res) => {
  const data = [
    // req.body.user_name,
    // req.body.user_contact,
    req.body.user_address,
    req.params.user_id,
  ];

  console.log("++++++++++++++++++++++++++")
  console.log(data)
  console.log("++++++++++++++++++++++++++")
  conn.execute(
    // "UPDATE home_user SET user_name=?, user_contact=? ,user_address=? WHERE user_id=?",
    "UPDATE home_user SET user_address=? WHERE user_id=?",
    data,
    
    (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({ message: "no update" });
        }
        return res
          .status(200)
          .json({ message: "The address is successfully Updated." });
        //console.log(error)
        //return error
      } else null, err;
      {
        return res.status(500).json({
          message: err,
        });
      }
    }
  );
};

module.exports = { Userdetailbyid, Updateaddress };
