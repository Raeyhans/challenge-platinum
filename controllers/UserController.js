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
        res.json(user);
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

exports.deleteUser = async (req,res,next) => {
    try{
        await db.Users.findByPk(req.params.id).then(function (result) {
            if (!!result) {
                db.Users.destroy({
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

exports.getUser = async (req,res,next) => {
    try{
        const user = await db.Users.findOne({
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