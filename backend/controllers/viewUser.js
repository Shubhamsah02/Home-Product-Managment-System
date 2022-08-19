const conn = require('../dbConnection');

const viewUsers = async(req,res)=>{
    const vendor_id = req.params.vendor_id;
    conn.execute('SELECT * FROM `orders` WHERE vendor_id="' + vendor_id + '"', function (err,result) {
        if (err){
            console.log(err)
        }
        else{
            console.log(result)
        return res.status(200).json({ products: result })
       
        }
    })
}
module.exports = {viewUsers}