const db = require('../models');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const sendEmail = require('../_helpers/email');

exports.registerSeller = async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    // if (!errors.isEmpty()) {
    //     return res.render('register', {
    //         error: errors.array()[0].msg
    //     });
    // }

    try {
        if (body.firstname == null || body.password == null || body.email == null || body.code == null) {
            return res.status(400).json({
                status: 400,
                msg: 'All field cannot empty.'
            });
        }
        const user = await db.Sellers.findOne({
            where: {
                email: body.email
        }});

        if (user != null) {
            return res.status(400).json({
                error: 'Please choose another email.'
            });
        }


        const hashToken = jwt.sign(body.email, body.password);

        await db.Sellers.create({
            firstname: body.firstname,
            lastname: body.lastname,
            email: body.email,
            password: body.password,
            address: body.address,
            city: body.city,
            code: body.code,
            token: hashToken,
            role: 'seller'
        });

        await sendEmail({
            to: body.email,
            from: process.env.EMAIL_FROM,
            subject: 'Sign-up Verification',
            html: `<h4>Verify Email</h4>
                    <p>Thanks for being seller!</p><p>Please use the below token to verify your email address with the <code>/account/verify/TOKEN</code> api route:</p>
                    <p><code>${hashToken}</code></p><p> or click this <a href="${process.env.HOST}/sellers/account/verify/${hashToken}">link</a> to verify your email address.</p>`             
        });
        
        res.status(201).json({
            status: 201,
            msg: 'You have successfully registered, please check your email and verify.'
        });

    } catch (e) {
        next(e);
    }
};

exports.getAllSeller = async (req,res,next) => {
    try{
        const user = await db.Sellers.findAll({
            attributes: {
                exclude: ['password','token']
            },
            order: [
                ['id', 'DESC']
            ]
        });
        res.status(200).json(user);
    }catch (e) {
        next(e);
    }
}

exports.editSeller = async (req,res,next) => {
    try{
        const {
            user: {
                id: sellerId,
                role: roleID
            },
            params: {
                id
            }
        } = req;

        if(roleID === 'seller'){
            if(sellerId != id){
                return res.status(404).json({
                    msg: 'User not found.'
                });
            }
        }

        await db.Sellers.findByPk(id).then(function (result) {
            if (result != null) {
                db.Sellers.update(req.body, {
                    where: {
                        id: id
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

exports.getSeller = async (req,res,next) => {
    try{
        const {
            user: {
                id: sellerId
            },
            params: {
                id
            }
        } = req;

        if(sellerId != id){
            return res.status(404).json({
                msg: 'Seller not found.'
            });
        }

        const user = await db.Sellers.findOne({
            attributes: {
                exclude: ['password','token']
            },
            where: {
                id: req.params.id
            }
        });
        if (user != null) {
            return res.status(200).json(user);
        }

    } catch (e) {
        next(e);
    }
}

exports.verifyEmail = async (req,res,next) => {
    try{
        const user = await db.Sellers.findOne({
            where: {
                token: req.params.token,
                status: 0
            }
        });
        if(user != null){
            db.Sellers.update(
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

exports.deleteSeller = async (req,res,next) => {
    try{
        const {
            user: {
                id: sellerId
            },
            params: {
                id
            }
        } = req;

        if(sellerId != id){
            return res.status(404).json({
                msg: 'User not found.'
            });
        }

        await db.Sellers.findByPk(id).then(function (result) {
            if (result != null) {
                db.Sellers.destroy({
                    where: {
                        id: id
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

exports.getContactSeller = async (req,res,next) => {
    try{
        const user = await db.Sellers.findAll({
            attributes: {
                exclude: ['password','token']
            },
            order: [
                ['id', 'DESC']
            ]
        });
        res.json(user);
    }catch (e) {
        next(e);
    }
}