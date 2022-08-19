const conn = require('../dbConnection')

const viewProduct = async (req, res,next) => {
    conn.execute('SELECT *FROM home_product' , function (err, product) {
        if (err) throw err;
        return res.status(200).json({products : product})      
        
        //console.log(result);
    })
}

const ViewProductByUserId = async (req, res) => {
    const user_id = req.params.user_id;
    conn.execute('SELECT * FROM `home_product` WHERE user_id="' + user_id + '"', function (err,result) {
        if (err){
            console.log(err)
        }
        else{
            console.log(result)
        return res.status(200).json({ products: result })
       
        }
    })
}


const randProduct = async (req, res) => {
    const product_id = req.params.product_id;
    let query = "SELECT * FROM home_product WHERE product_status = 'In Stock' ORDER BY RAND() LIMIT 3"
    conn.query(query, [product_id], (err, result) => {
        if(err) {
            console.log(err)
            return res.status(404).json({
                status: 0,
                message: "Not Found.",
            });
        }
        else {
            //console.log(result)
            return res.status(200).json({
                response: result
            });
        }
    });
}
module.exports = { viewProduct ,ViewProductByUserId, randProduct}