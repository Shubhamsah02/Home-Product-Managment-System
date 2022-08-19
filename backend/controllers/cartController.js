const conn = require('../dbConnection')

const addCart = async (req, res) => {
    const product_id = req.params.product_id;
    let sqll = `select * from home_product where product_id=${product_id}`;
    conn.query(sqll, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            
            const user_id = req.body.user_id;
            const product_idd = req.body.product_id;
            const vendor = result[0].user_id
            const product_name = req.body.product_name;
            const product_price = req.body.product_price;
            const product_qty = req.body.product_qty;
            const product_photo = req.body.product_photo;
            console.log(vendor)

            let query = "INSERT INTO `home_cart`(`user_id`,`vendor_id`, `product_id`, `product_name`, `product_price`, `product_qty`, `product_photo`) VALUES (?, ?, ?, ?, ?, ?, ?)";
            //let query = "INSERT INTO `home_cart`(`user_id`, `product_id`, `product_name`, `product_price`, `product_qty`) VALUES (?, ?, ?, ?, ?)"; 
            conn.query(query, [user_id,vendor, product_idd, product_name, product_price, product_qty, product_photo], (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(404).json({
                        status: 0,
                        message: "Not Found.",
                    });

                }
                else {
                    //console.log(result)
                    return res.status(200).json({
                        status: 1,
                        message: "Successfully inserted.",
                    });
                }
            });
        }
    })
}

const viewCart = async (req, res) => {
    const user_id = req.params.user_id;

    let query = "SELECT * FROM `home_cart` WHERE user_id = ?"; 
   conn.query(query,[user_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(404).json({
                status: 0,
                message: "Not Found.",   
            });

        }
        else
        {
            //console.log(result)
            return res.status(200).json({
                status: 1,
                response: result,
            }); 
        }
    });
}

const deleteCart = async (req, res) => {
    const user_id = req.params.user_id;
    const product_id = req.params.product_id;

    let query = "DELETE FROM `home_cart` WHERE (user_id = ? AND product_id = ?)"; 
   conn.query(query,[user_id, product_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(404).json({
                status: 0,
                message: "Not Found.",   
            });

        }
        else
        {
            return res.status(200).json({
                status: 1,
                message: "Successfully deleted",
            }); 
        }
    });
}

const deleteAll = async(req, res) => {
    const user_id = req.params.user_id;
  
    const query = "DELETE FROM home_cart WHERE (user_id = ?)"; 
    conn.query(query,[user_id], (err, result) => {
        console.log(err)
        if (err) {
            console.log(err)
            return res.status(404).json({
                status: 0,
                message: err,   
            });
        }
        else
        {
            return res.status(200).json({
                status: 1,
                message: "Successfully deleted",
            }); 
        }
    });
}

const countCart = async (req, res) => {
    const user_id = req.params.user_id;

    let query = "SELECT COUNT(product_name) AS ncount FROM home_cart WHERE user_id = ?"

    conn.query(query, [user_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(404).json({
                status: 0,
                message: "Not Found",   
            });
        }
        else
        {
            return res.status(200).json({
                status: 1,
                response: result,
            }); 
        }
    })
}

module.exports = { addCart, viewCart, deleteCart, deleteAll, countCart }