const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const db = require('../models');
const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res, next) => {

    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.json({
            error: errors.array()[0].msg
        });
    }

    try {

        const user = await db.Users.findOne({
            where: {
                username: body.username
            }});

        if (user == null) {
            return res.json({
                error: 'Invalid email or password.'
            });
        }

        const checkPass = await bcrypt.compare(body.password, user.password);

        if (checkPass === true) {
            const token = jwt.sign({
                id: user.id,
                role: 'admin'
             }, 'secret');
            return res.status(200).json({
                msg: 'You have successfully logged in.',
                token
            });
        }

        res.json({
            error: 'Invalid email or password.'
        });
    }
    catch (e) {
        next(e);
    }

}

exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;
    try {
        const user = await db.Users.findOne({
            where: {
                username: body.username
            }});

        if (user != null) {
            return res.status(400).json({
                error: 'Please choose another username.'
            });
        }

        const hashPass = await bcrypt.hash(body.password, 12);
        await db.Users.create({
            username: body.username,
            name: body.name,
            email: body.email,
            password: hashPass
        });
        
        res.status(201).json({
            msg: 'You have successfully registered.'
        });

    } catch (e) {
        next(e);
    }
}

exports.loginCustomer = async (req, res, next) => {

    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.json({
            error: errors.array()[0].msg
        });
    }

    try {

        const customer = await db.Customers.findOne({
            where: {
                email: body.email
            }});

        if (customer == null) {
            return res.status(400).json({
                error: 'Invalid email or password.'
            });
        }

        const checkPass = await bcrypt.compare(body.password, customer.password);
        const checkStatus = await db.Customers.findOne({
            where: {
                email: body.email,
                status: 1
            }
        });
        if(checkStatus != null){
            if (checkPass === true) {
                const token = jwt.sign({
                    id: customer.id,
                    role: 'customer',
                }, 'secret');
                return res.status(200).json({
                    msg: 'You have successfully logged in.',
                    token
                });
            }
        }
        res.status(400).json({
            error: 'Invalid email or password.'
        });
    }
    catch (e) {
        next(e);
    }

};

exports.loginSeller = async (req, res, next) => {

    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.json({
            error: errors.array()[0].msg
        });
    }

    try {

        const seller = await db.Sellers.findOne({
            where: {
                email: body.email
            }});

        if (seller == null) {
            return res.json({
                error: 'Invalid email or password.'
            });
        }

        const checkPass = await bcrypt.compare(body.password, seller.password);
        const checkStatus = await db.Sellers.findOne({
            where: {
                email: body.email,
                status: 1
            }
        });
        if(checkStatus != null){
            if (checkPass === true) {
                const token = jwt.sign({
                    id: seller.id,
                    role: 'seller'
                }, 'secret');
                return res.status(200).json({
                    msg: 'You have successfully logged in.',
                    token
                });
            }
        }
        res.json({
            error: 'Invalid email or password.'
        });
    }
    catch (e) {
        next(e);
    }

};