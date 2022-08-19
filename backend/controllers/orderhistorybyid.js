const conn = require('../dbConnection')

const OrderHistorybyId = async (req, res) => {
    const user_id = req.params.user_id
    conn.execute(`select * from orders where user_id=${user_id} AND payment_status='Paid'`, [req.params.user_id],
     function (err, OrderHistorybyId) {
        if (err) throw err;
        return res.status(200).json({ datas: OrderHistorybyId })

    })
}

module.exports={OrderHistorybyId}