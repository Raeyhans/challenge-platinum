const db = require('../models');

exports.getMessage = async (req,res,next) => {
    try{
        const messages = await db.Messages.findAll({
            where: {
                id_customer: req.body.sender,
                id_seller: req.body.receiver
            },
            group: ['id_customer', 'id_seller']
        });
        if(messages != null){
            return res.status(200).json(messages);
        }
        return res.status(404).json({
            msg: 'Message not found.'
        });
    }catch (e) {
        next(e);
    }
}

exports.createMessage = async (req,res,next) => {
    try{
        const {
            user: {
                id: adminId
            }
        } = req;

        const data = {
            id_customer: adminId,
            id_seller: 3,
            created_by: adminId,
            updated_by: adminId,
        }

        await db.Messages.create(data);
        return res.status(201);

    }catch (e) {
        next(e);
    }
}