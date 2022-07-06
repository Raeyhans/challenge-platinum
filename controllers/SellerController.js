const db = require('../models');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const sendEmail = require('../_helpers/email');

exports.registerSeller = async (req, res, next) => {
    const errors = validationResult(req);
    const { body } = req;

    if (!errors.isEmpty()) {
        return res.render('register', {
            error: errors.array()[0].msg
        });
    }

    try {

        const user = await db.Sellers.findOne({
            where: {
                email: body.email
            }});

        if (user != null) {
            return res.json({
                status: 400,
                error: 'Please choose another email.'
            });
        }

        const hashPass = await bcrypt.hash(body.password, 12);
        const hashToken = jwt.sign(body.password, body.email);

        await db.Sellers.create({
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
                    <p>Thanks for being seller!</p><p>Please use the below token to verify your email address with the <code>/account/verify/TOKEN</code> api route:</p>
                    <p><code>${hashToken}</code></p>`
                    
        });
        
        res.status(200).json({
            msg: 'You have successfully registered.'
        });

    } catch (e) {
        next(e);
    }
};

exports.getAllSeller = async (req,res,next) => {
    try{
        const user = await db.Sellers.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        res.json(user);
    }catch (e) {
        next(e);
    }
}

exports.editSeller = async (req,res,next) => {
    try{
        await db.Sellers.findByPk(req.params.id).then(function (result) {
            if (!result) {
                db.Sellers.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                });
                return res.json({
                    status: 200,
                    msg: 'User updated.'
                });
            } 
            return res.json({
                status: 404,
                msg: 'User not found.'
            });
        });
    }catch (e) {
        next(e);
    }
}

exports.getSeller = async (req,res,next) => {
    try{
        const user = await db.Sellers.findOne({
            where: {
                id: req.params.id
            }
        });
        if(!!user){
            return res.json(user);
        }
        return res.json({
            status: 404,
            msg: 'User not found.'
        });
    }
    catch (e) {
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

exports.deleteSeller = async (req,res,next) => {
    try{
        await db.Sellers.findByPk(req.params.id).then(function (result) {
            if (!!result) {
                db.Sellers.destroy({
                    where: {
                        id: req.params.id
                    }
                });
                return res.json({
                    status: 200,
                    msg: 'User deleted.'
                });
            } 
            return res.json({
                status: 404,
                msg: 'User not found.'
            });
        });


    }catch (e) {
        next(e);
    }
}