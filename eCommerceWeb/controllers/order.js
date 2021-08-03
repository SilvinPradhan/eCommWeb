const {Order, CartItem} = require('../models/order')
const {errorHandler} = require('../helpers/dbErrorHandler')
const sendgridMail = require('@sendgrid/mail')
sendgridMail.setApiKey(`${process.env.SENDGRID_KEY}`)

exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((error, order) => {
            if (error || !order) {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            req.order = order
            next()
        })
}

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
        console.log('Order has just been saved to the database', order);
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        const emailData = {
            to: 'silvinpradhan95@gmail.com', // admin
            from: 'techline2006@gmail.com',
            subject: `A new order is received!`,
            html: `
                <h1>Hey Admin, a customer just made a purchase in eCommWeb</h1>
                <h2>Customer name: ${order.user.name}</h2>
                <h2>Customer address: ${order.address}</h2>
                <h2>User's purchase history: ${order.user.history.length}</h2>
                <h2>User's email: ${order.user.email}</h2>
                <h2>Total products: ${order.products.length}</h2>
                <h2>Transaction ID: ${order.transaction_id}</h2>
                <h2>Order Status: ${order.status}</h2>
                <h2>Product Details:</h2>
                <hr />
                ${
                order.products.map(p => {
                    return `
                        <div>
                        <h3>Product Name: ${p.name}</h3>
                        <h3>Product Price: ${p.price}</h3>
                        <h3>Product Quantity: ${p.count}</h3>
                        </div>
                    `;
                }).join('_____________________________')
            }
                <h2>Total order cost: ${order.amount}</h2>
                <p><a>Login to your dashboard</a> to see the order in detail</p>
            `
        };
        sendgridMail.send(emailData)
            .then(sent => console.log('Email Admin >>>', sent))
            .catch(err => console.log('ERR >>>', err))
        // Email alert to the buyer
        const emailData2 = {
            to: order.user.email,
            from: 'techline2006@gmail.com',
            subject: `Your order is in process`,
            html: `
                <h1>Hey ${req.profile.name}, thank you for shopping with eCommWeb.</h1>
                <h2>Details of the order/s </h2>
                <h3>Total products: ${order.products.length}</h3>
                <h3>Transaction ID: ${order.transaction_id}</h3>
                <h3>Order Status: ${order.status}</h3>
                <h3>Product details:</h3>
                <hr />
                ${
                order.products.map(p => {
                    return `
                        <div>
                            <h4>Product Name: ${p.name}</h4>
                            <h4>Product Price: ${p.price}</h4>
                            <h4>Product Quantity: ${p.count}</h4>
                        </div>
                    `;
                }).join('_____________________________')
            }
                <h2>Total order cost: ${order.amount}</h2>
                <p>Thank you for shopping with us.</p>
            `
        };
        sendgridMail.send(emailData2)
            .then(sent => console.log('Email Buyer: ', sent))
            .catch(err => console.log('Error: ', err))
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

exports.updateOrderStatus = (req, res) => {
    Order.update({_id: req.body.orderId}, {$set: {status: req.body.status}}, (error, order) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            })
        }
        res.json(order)
    })
}
