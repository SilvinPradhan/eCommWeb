const {Order, CartItem} = require('../models/order')
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
    // console.log('Create order', req.body);
    req.body.order.user = req.profile
    const order = new Order(req.body.order)
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(data)
    })
}

exports.listOrders = (req, res) => {
    Order.find()
        .populate('user', "_id username address")
        .sort('-created')
        .exec((error, orders) => {
            if (error) {
                return res.status(400).json({
                    error: 'Could not find the list of item orders.'
                })
            }
            res.json(orders)
        })
}

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues)
}
