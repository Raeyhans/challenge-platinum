const db = require('../models');

exports.createOrder = async (req, res, next) => {
    try {
        const {
            user: {
                id: customerId
            },
            body: {
                orders, items
            }
        } = req;

        const total_amount = items.reduce((acc, item) => {
            return acc + item.price * item.qty;
        }, 0);

        const total_qty = items.reduce((acc, item) => {
            return acc + item.qty;
        }, 0);

        const data = {
            customer_id: customerId,
            total: total_amount,
            qty: total_qty,
            status: req.body.orders.status,
            orderdetails: items.map(item => {
                return {
                    item_id: item.id,
                    qty: item.qty,
                    price: item.price,
                }
            })
        }
        const order = await db.Orders.create(data, {
            include: [{
                model: db.Orderdetails,
                as: 'orderdetails',
            }]
        });
        return res.json({
            status: 201, 
            data: order
        });
    } catch (e) {
        next(e);
    }
}

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await db.Orders.findAll();
        res.json(orders);
    } catch (e) {
        next(e);
    }
}

exports.getOneOrder = async (req, res, next) => {
    try {
        const user = await db.Orders.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!!user) {
            return res.json(user);
        }
        return res.json({
            status: 404,
            msg: 'Order not found.'
        });
            
    } catch (e) {
        next(e);
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        await db.Orders.findByPk(req.params.id).then(function (result) {
            if (!!result) {
                db.Orders.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                });
                return res.json({
                    status: 200,
                    msg: 'Status updated.',
                    status: req.body.status
                });
            } 
            return res.json({
                status: 404,
                msg: 'Order not found.'
            });
        });
    } catch (e) {
        next(e);
    }
}