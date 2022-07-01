const db = require('../models');

exports.createItem = async (req,res,next) => {
    try{
        const {
            user: {
                code: cCode,
                id: userId
            },
            body: {
                items, pictures
            }
        } = req;

        const finder = await db.Items.findOne({
            where: {
                code: req.body.items.code
            }
        });
        if(!!finder){
            const data = {
                customer_code: cCode,
                code: req.body.items.code,
                title: req.body.items.title,
                price: req.body.items.price,
                qty: req.body.items.qty,
                itemGallery: pictures.map(item => {
                    return {
                        picture: item.picture,
                        created_by: userId
                    }
                })
            }
            const item = await db.Items.create(data, {
                include: [{
                    model: db.ItemGallery,
                    as: 'itemGallery',
                }]
            });
            return res.json({
                status: 201, 
                data: item
            });
        }
        return res.json({
            status: 404,
            msg: 'This item has been insert.'
        })

    }catch (e) {
        next(e);
    }
}

exports.addImage = async (req,res,next) => {
    try{
        const {
            itemID: {
                id: itemId
            },
            body: {
                items
            }
        } = req;

        const data = {
            item_id: itemId,
            picture: req.body.orders.picture,
            created_by: req.body.orders.created_by
        }
        const image = await db.ItemGallery.create(data);
        return res.json({
            status: 201, 
            data: image
        });

    }catch (e) {
        next(e);
    }
}

exports.getItems = async (req,res,next) => {
    try{
        const item = await db.Items.findAll();
        res.json(item);
    }catch (e) {
        next(e);
    }
}

exports.editItem = async (req,res,next) => {
    try{
        await db.Items.findByPk(req.params.id).then(function (result) {
            if (!!result) {
                db.Items.update(req.body, {
                    where: {
                        id: req.params.id
                    }
                });
                return res.json({
                    status: 200,
                    msg: 'Item updated.'
                });
            } 
            return res.json({
                status: 404,
                msg: 'Item not found.'
            });
        });
    }catch (e) {
        next(e);
    }
}

exports.deleteItem = async (req,res,next) => {
    try{
        await db.Items.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.json({
            status: 200,
            msg: 'Item deleted.'
        });
    }catch (e) {
        next(e);
    }
}

exports.getItem = async (req,res,next) => {
    try{
        const item = await db.Items.findOne({
            where: {
                id: req.params.id
            }
        });
        if(!!item){
            return res.json({
                status: 200,
                item
            });
        }
        return res.json({
            status: 404,
            msg: 'Item not found.'
        });
    }
    catch (e) {
        next(e);
    }
}