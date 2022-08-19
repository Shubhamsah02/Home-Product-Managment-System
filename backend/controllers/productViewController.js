const conn = require('../dbConnection')

// const viewProduct = async (req, res) => {
//     conn.execute('SELECT *FROM home_product', function (err, product) {
//         if (err) throw err;
//         return res.status(200).json({ products: product })


//         //console.log(result);
//     })
// }

const ViewProductById = async (req, res) => {
    conn.execute('SELECT *FROM home_product WHERE product_id=?', [req.params.id], function (err, viewproductbyid) {
        if (err) throw err;
        return res.status(200).json({ products: viewproductbyid })

    })
}

//delete product

const DeleteProduct = async (req, res) => {
    
    const  id = req.params.id
    conn.query('SELECT * FROM home_product WHERE product_id ="' + id + '"', function (err, result) {
        if (err){
            //console.log(err)
            return res.status(404).json({ status: 0, message: "Error" })
        }
        //console.log(user_email)
        //console.log(result[0]);
       // console.log(result[0].product_id)
        try {
            if (result[0].product_id) 
            {
                    conn.query('DELETE FROM home_product WHERE product_id="' + result[0].product_id + '"', function(err, results){
                        if (err) throw err

                    })
                    return res.status(200).json({ status: 1, message: "Successfully Deleted" })
            }
            }
            
         catch (err) {
            return res.status(404).json({ status: 0, message: "No Product Available" })

            }
        });
}

// const DeleteProduct = async (req, res) => {
    
//     const  id = req.params.id
//     const index = 
    
//     //console.log(id)
//     conn.execute('DELETE FROM home_product WHERE product_id="' + id + '"', (err, results) => {
//         if (err) {
//             //console.log(error)
//             //return error
//             return res.status(404).json({
//                 status: 0,
//                 message: "Not Found.",
//             });
//         }
//         else (null, results)
//         {
//             return res.status(201).json({
//                 status: 1,
//                 message: "The Product data is successfully Deleted.",
//             });
//         }

//     })
// }
//
/* const UpdateProduct = async (req, res) => {
    const data =["pillow",35]
    conn.execute('UPDATE home_product SET product_name=? WHERE product_id=?',data,(err,result,fields)=>{
        if (err) throw error;
        res.send(result)
    })
} */

// const UpdateProduct = async (req, res) => {
//     const data = [req.body.product_name, req.body.product_category, req.body.product_description, req.body.product_price, req.body.product_discount, req.body.product_photo, req.params.id]
//     //console.log(data)
//     conn.execute('UPDATE home_product SET product_name=?, product_category=?, product_description=?, product_price=?, product_discount=?, product_photo=?  WHERE product_id=?', data, 
//     (err, results) => {
//         if (!err) {
//             if(results.affectedRows==0){
//                 return res.status(404).json({message:"product id not found"})
//             }
//             return res.status(200).json({message:"The Product data is successfully Updated."})
//             //console.log(error)
//             //return error
            
//         }
//         else (null, results)
//         {
//             return res.status(500).json({

//             });
//         }
//     })
// }

const UpdateProduct = async (req, res) => {
    const data = [req.body.product_name, req.body.product_description, req.body.product_price, req.body.product_discount, req.params.id]
    //console.log(data)
    conn.execute('UPDATE home_product SET product_name=?, product_description=?, product_price=?, product_discount=? WHERE product_id=?', data, 
    (err, results) => {
        if (!err) {
            if(results.affectedRows==0){
                return res.status(404).json({message:"product id not found"})
            }
            return res.status(200).json({message:"The Product data is successfully Updated."})
            //console.log(error)
            //return error
            
        }
        else (null, results)
        {
            return res.status(500).json({

            });
        }
    })
}

module.exports = {  ViewProductById, DeleteProduct, UpdateProduct }