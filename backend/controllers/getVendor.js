const conn = require('../dbConnection')

const getVendor = (req, res) => {
    const product_id = req.params.product_id;
    /* const query1 = conn.execute('SELECT * FROM `home_product` WHERE product_id ="' + product_id + '"', function(err,result){
        if (err){
                    console.log(err)
                }
                else{
                    console.log(result[0].user_id)
                    vendor=result[0].user_id
                return res.status(200).json({ vendor })
               
                }
    })  */
    let sqll = `select * from home_product where product_id=${product_id}`;
    conn.query(sqll, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            const vendor=result[0].user_id
            return res.status(200).json({ vendor })
        }
    })

}
module.exports={getVendor}