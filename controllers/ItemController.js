const db = require('../models');

exports.createItem = async (req, res, next) => {
    try {
        const {
            user: {
                code: sellerCode,
                id: sellerId
            },
            body: {
                items,
                pictures
            }
        } = req;

        const finder = await db.Items.findOne({
            where: {
                code: req.body.items.code
            }
        });
        console.log(req.body.items.code);
        if(finder != null){
            return res.status(100).json({
                msg: 'This item has been insert.'
            });
            
        }
        const data = {
            seller_code: sellerCode,
            category_id: req.body.items.category_id,
            code: req.body.items.code,
            title: req.body.items.title,
            price: req.body.items.price,
            qty: req.body.items.qty,
            // itemGalleries: pictures?.map(item => {
            //     return {
            //         picture: item.picture,
            //         created_by: sellerId
            //     }
            // })
        }
        
        const item = await db.Items.create(data, {
            // include: [{
            //     model: db.ItemGallery,
            //     as: 'itemGalleries',
            // }]
        });
        return res.status(201).json({
            msg: 'New item successfully insert.',
            data: item
        });

    } catch (e) {
        next(e);
    }
}

exports.addImage = async (req, res, next) => {
    try {
        const {
            user: {
                id: sellerId
            },
            body: {
                id_item,
                image
            }
        } = req;

        if(!image.length) {
            return res.status(400).json({
                msg: 'Image is required.'
            })
        }
        
        const data = image.map(item => {
            return {
                id_item,
                picture: item,
                created_by: sellerId
            }
        });
        
        await db.ItemGallery.bulkCreate(data);
        return res.status(201).json({
            msg: 'Image added.'
        });

    } catch (e) {
        next(e);
    }
}

exports.getItems = async (req, res, next) => {
    try {
        const item = await db.Items.findAll({
            include: [{
                model: db.ItemGallery,
                as: 'itemGalleries'
            }],
            order: [
                ['id', 'DESC']
            ]
        });
        if (item != null) {
            return res.status(200).json(item);
        }
        throw new Error('Item not found.');

    } catch (e) {
        next(e);
    }
}

exports.editItem = async (req, res, next) => {
    try {
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
    } catch (e) {
        next(e);
    }
}

exports.deleteItem = async (req, res, next) => {
    try {
        await db.Items.findByPk(req.params.id).then(function (result) {
            if (result != null) {
                db.Items.destroy({
                    where: {
                        id: req.params.id
                    },
                });
                return res.status(200).json({
                    msg: 'Item deleted.'
                });
            }
            return res.status(404).json({
                msg: 'Item not found.'
            });
        });

    } catch (e) {
        next(e);
    }
}

exports.getItem = async (req, res, next) => {
    try {
        const item = await db.Items.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: db.ItemGallery,
                as: 'itemGalleries'
            }],
        });
        if (item != null) {
            return res.status(200).json({
                item
            });
        }
        return res.status(404).json({
            msg: 'Item not found.'
        });
    } catch (e) {
        next(e);
    }
}

exports.getImage = async (req, res, next) => {
    try {
        const image = await db.ItemGallery.findAll({
            where: {
                id_item: req.params.id
            }
        });
        if (image.length) {
            return res.status(200).json({
                image
            });
        }
        return res.status(404).json({
            msg: 'Image not found.'
        });

    } catch (e) {
        next(e);
    }
}