const db = require('../models');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const sendEmail = require('../_helpers/email');
const jwt = require('jsonwebtoken');

exports.registerCustomer = async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('register', {
            error: errors.array()[0].msg
        });
    }

    try {
        if (body.firstname == null || body.password == null || body.email == null) {
            return res.status(400).json({
                status: 400,
                msg: 'All field cannot empty.'
            });
        }

        const user = await db.Customers.findOne({
            where: {
                email: body.email
            }});

        if (user != null) {
            return res.status(400).json({
                error: 'Please choose another email.'
            });
        }

        const hashToken = jwt.sign(body.email, body.password);

        await db.Customers.create({
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            password: body.password,
            address: body.address,
            city: body.city,
            token: hashToken,
            status: 0,
            role: 'customer',
        });

        await sendEmail({
            to: body.email,
            subject: 'Sign-up Verification',
            html: `<h4>Verify Email</h4>
                    <p>Thanks for registering!</p><p>Please use the below token to verify your email address with the <code>/account/verify/TOKEN</code> api route:</p>
                    <p><code>${hashToken}</code></p>`
                    
        });

        res.status(201).json({
            msg: 'You have successfully registered, please check your email and verify.'
        });

    } catch (e) {
        next(e);
    }
};

exports.getAllCustomer = async (req,res,next) => {
    try{
        const user = await db.Customers.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        res.status(200).json(user);
    }catch (e) {
        next(e);
    }
}

exports.editCustomer = async (req,res,next) => {
    try{
        await db.Customers.findByPk(req.params.id).then(function (result) {
            if (result != null) {
                db.Customers.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                });
                return res.status(200).json({
                    msg: 'User updated.'
                });
            } 
            return res.status(404).json({
                msg: 'User not found.'
            });
        });
    }catch (e) {
        next(e);
    }
}

exports.getCustomer = async (req,res,next) => {
    try{
        const {
            user: {
                id: customerId
            },
            params: {
                id
            }
        } = req;

        if(customerId != id){
            return res.status(404).json({
                msg: 'User not found.'
            });
        }

        const user = await db.Customers.findOne({
            where: {
                id: id,
                status: 1
            }
        });
        if(user != null){
            return res.status(200).json(user);
        }
    }
    catch (e) {
        next(e);
    }
}

exports.verifyEmail = async (req,res,next) => {
    try{
    
        const user = await db.Customers.findOne({
            where: {
                token: req.params.token,
                status: 0
            }
        });
        if(user != null){
            db.Customers.update(
            { status: 1 },
            { where: { token: req.params.token } }
            );

            return res.status(200).json({
                msg: 'Your account successfuly activated.'
            });
        }
        return res.status(404).json({
            msg: 'User not found.'
        });
    }catch (e) {
        next(e);
    }
}

exports.deleteCustomer = async (req,res,next) => {
    try{
        await db.Customers.findByPk(req.params.id).then(function (result) {
            if (result != null) {
                db.Customers.destroy({
                    where: {
                        id: req.params.id
                    }
                });
                return res.status(200).json({
                    msg: 'User deleted.'
                });
            } 
            return res.status(404).json({
                msg: 'User not found.'
            });
        });


    }catch (e) {
        next(e);
    }
}