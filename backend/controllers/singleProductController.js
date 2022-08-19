const conn = require('../dbConnection')

const singleProduct = async (req, res) => {
    const product_id=req.params.product_id
    let sqll = `select * from home_product where product_id=${product_id}`;
    conn.query(sqll, (err, result) => {
        if (err) {
            return res.status(404).send(err)
            console.log(err)
        }
        else {
            return res.status(200).send(result)
        }
    })

}
module.exports = { singleProduct }