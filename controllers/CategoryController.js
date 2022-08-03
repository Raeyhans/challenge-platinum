const db = require('../models');

exports.createCategory = async (req,res,next) => {
    try{
        const {
            user: {
                id: adminId
            }
        } = req;

        const data = {
            seotitle: req.body.title.toLowerCase().split(' ').join('-'),
            title: req.body.title,
            created_by: adminId,
            updated_by: adminId,
        }

        await db.Categories.create(data);
        return res.status(201).json({
            msg: 'Category created.',
        });

    }catch (e) {
        next(e);
    }
}

exports.getCategories = async (req,res,next) => {
    try{
        const category = await db.Categories.findAll();
        if(category != null){
            return res.json(category);
        }
        throw new Error('Category not found.');

    }catch (e) {
        next(e);
    }
}

exports.editCategory = async (req,res,next) => {
    try{
        const {
            user: {
                id: adminId
            }
        } = req;

        const data = {
            seotitle: req.body.title.toLowerCase().split(' ').join('-'),
            title: req.body.title,
            updated_by: adminId,
        }

        await db.Categories.findByPk(req.params.id).then(function (result) {
            if (result != null) {
                db.Categories.update(data, {
                    where: {
                        id: req.params.id
                    }
                });
                return res.status(200).json({
                    msg: 'Category updated.'
                });
            } 
            return res.status(404).json({
                msg: 'Category not found.'
            });
        });
    }catch (e) {
        next(e);
    }
}

exports.deleteCategory = async (req,res,next) => {
    try{
        await db.Categories.findByPk(req.params.id).then(function (result) {
            if (result != null) {
                db.Categories.destroy({
                    where: {
                        id: req.params.id
                    }
                });
                return res.status(200).json({
                    msg: 'Category deleted.'
                });
            } 
            return res.status(404).json({
                msg: 'Category not found.'
            });
        });

    }catch (e) {
        next(e);
    }
}

exports.getCategory = async (req,res,next) => {
    try{
        const category = await db.Categories.findOne({
            where: {
                id: req.params.id
            }
        });
        if(category != null){
            return res.status(200).json({
                category
            });
        }
        return res.status(404).json({
            msg: 'Category not found.'
        });
    }
    catch (e) {
        next(e);
    }
}