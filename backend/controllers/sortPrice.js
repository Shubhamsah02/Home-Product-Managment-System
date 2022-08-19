const conn = require('../dbConnection')


exports.sortPrice = async (req, res) => {
    const price = req.params.product_price;
    if (price === '50') {
        let sqll = `select * from home_product WHERE product_price < 50`;
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
    else if (price === '50100') {
        let sqll = `select * from home_product WHERE product_price >=50 && product_price <= 100`;
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
    else if (price === '100') {
        let sqll = `select * from home_product WHERE product_price >= 100`;
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
    
}
