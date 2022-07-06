const db = require('../models');

exports.createItem = async (req,res,next) => {
    try{
        const {
            user: {
                code: sellerCode,
                id: sellerId
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

        // if(finder != req.body.items.code){
            const data = {
                seller_code: sellerCode,
                category_id: req.body.items.category_id,
                code: req.body.items.code,
                seotitle: req.body.items.seotitle,
                title: req.body.items.title,
                price: req.body.items.price,
                qty: req.body.items.qty,
                itemGalleries: pictures.map(item => {
                    return {
                        picture: item.picture,
                        created_by: sellerId
                    }
                })
            }
            const item = await db.Items.create(data, {
                include: [{
                    model: db.ItemGallery,
                    as: 'itemGalleries',
                }]
            });
            return res.status(201).json({
                data: item
            });
        // }
        // return res.status(100).json({
        //     msg: 'This item has been insert.'
        // })

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
        return res.status(201).json({
            data: image
        });

    }catch (e) {
        next(e);
    }
}

exports.getItems = async (req,res,next) => {
    try{
        const item = await db.Items.findAll({
            include: [
                { model: db.ItemGallery, as: 'itemGalleries' }
            ]
        });
        if(item != null){
            return res.status(200).json(item);
        }
        throw new Error('Item not found.');

    }catch (e) {
        next(e);
    }
}

exports.editItem = async (req,res,next) => {
    try{
        await db.Items.findByPk(req.params.id).then(function (result) {
            if (result != null) {
                db.Items.update(req.body, {
                    where: {
                        id: req.params.id
                    },
                    include: [{
                        model: db.Sellers,
                        as: 'updatedBy',
                    }]
                });
                return res.status(200).json({
                    msg: 'Item updated.'
                });
            } 
            return res.status(404).json({
                msg: 'Item not found.'
            });
        });
    }catch (e) {
        next(e);
    }
}

exports.deleteItem = async (req,res,next) => {
    try{
        const item = await db.Items.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({
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
            },
            include: [
                { model: db.ItemGallery, as: 'itemGalleries' }
            ],
        });
        if(item != null){
            return res.status(200).json({
                item
            });
        }
        return res.status(404).json({
            msg: 'Item not found.'
        });
    }
    catch (e) {
        next(e);
    }
}