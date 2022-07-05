const db = require('../models');

exports.createCategory = async (req,res,next) => {
    try{
        const {
            user: {
                id: adminId
            }
        } = req;

        const data = {
            seotitle: req.body.seotitle,
            title: req.body.title,
            created_by: adminId,
            updated_by: adminId,
        }

        await db.Categories.create(data);
        return res.json({
            status: 201, 
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
        await db.Categories.findByPk(req.params.id).then(function (result) {
            if (!!result) {
                db.Categories.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                });
                return res.json({
                    status: 200,
                    msg: 'Category updated.'
                });
            } 
            return res.json({
                status: 404,
                msg: 'Category not found.'
            });
        });
    }catch (e) {
        next(e);
    }
}

exports.deleteCategory = async (req,res,next) => {
    try{
        await db.Categories.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.json({
            status: 200,
            msg: 'Category deleted.'
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
            return res.json({
                status: 200,
                category
            });
        }
        return res.json({
            status: 404,
            msg: 'Category not found.'
        });
    }
    catch (e) {
        next(e);
    }
}