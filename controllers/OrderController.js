const db = require('../models');
const { Op } = require('sequelize');

exports.createOrder = async (req, res, next) => {
    const t = await db.sequelize.transaction();

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
            status: 'UNPAID',
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
            }],
            transaction: t
        });

        const getitem = await db.Items.findAll({
            where : {
                id: {
                    [Op.in]: items.map(item => item.id)
                }
            }
        });

        await db.Items.bulkCreate(getitem.map(item => {
            return {
                    ...item.dataValues,
                    qty: item.qty - items.find(i => i.id === item.id).qty,
                }
            }),
            {
                transaction: t,
                updateOnDuplicate: ['qty']
            }
        );

        await t.commit();

        return res.json({
            status: 201, 
            data: order
        });
    } catch (e) {
        await t.rollback();
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
        const order = await db.Orders.findOne({
            where: {
                id: req.params.id
            }
        });
        if (order != null) {
            return res.json(order);
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
            if (result != null) {
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