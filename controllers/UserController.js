const db = require('../models');
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

exports.createUser = async (req,res,next) => {
    try{
        const user = await db.Users.create(req.body);
        // res.json(user);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.save().then((user) => res.status(201).send(user));

    }catch (e) {
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
                msg: 'Please choose another username.'
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

exports.getAllUser = async (req,res,next) => {
    try{
        const user = await db.Users.findAll({
            attributes: {
                exclude: ['password']
            }
        });
        res.status(200).json(user);
    }catch (e) {
        next(e);
    }
}

exports.editUser = async (req,res,next) => {
    try{
        await db.Users.findByPk(req.params.id).then(function (result) {
            if (!!result) {
                db.Users.update(req.body, {
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

exports.deleteUser = async (req,res,next) => {
    try{
        await db.Users.findByPk(req.params.id).then(function (result) {
            if (!!result) {
                db.Users.destroy({
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

exports.getUser = async (req,res,next) => {
    try{
        const user = await db.Users.findOne({
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