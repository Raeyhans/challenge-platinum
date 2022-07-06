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

        const user = await db.Customers.findOne({
            where: {
                email: body.email
            }});

        if (user != null) {
            return res.status(400).json({
                error: 'Please choose another email.'
            });
        }

        const hashPass = await bcrypt.hash(body.password, 12);
        // const hashToken = await bcrypt.hash(body.email, 12);
        const hashToken = jwt.sign(body.password, body.email);

        await db.Customers.create({
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            password: hashPass,
            address: body.address,
            city: body.city,
            code: body.code,
            token: hashToken,
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
                msg: 'Email has been verify.'
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

exports.getCustomer = async (req,res,next) => {
    try{
        const user = await db.Customers.findOne({
            where: {
                id: req.params.id
            }
        });
        if(user != null){
            return res.status(200).json(user);
        }
        return res.status(404).json({
            msg: 'User not found.'
        });
    }
    catch (e) {
        next(e);
    }
}