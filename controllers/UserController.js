const db = require('../models');
const bcrypt = require("bcrypt");

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