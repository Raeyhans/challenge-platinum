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

exports.getSellerContactChat = async (req,res,next) => {
    try{
        const {
            user: {
                id: customerId
            }
        } = req;

        const data = {
            id_customer: customerId,
            id_seller: 3,
            created_by: customerId,
            updated_by: customerId,
        }
console.log(data);
        const messages = await db.sequelize.query('SELECT distinct chat_group FROM messages WHERE id_customer = :id_customer', {
            replacements: {
                id_customer: customerId
            },
            type: db.sequelize.QueryTypes.SELECT
        });

        res.json(messages);

    }catch (e) {
        next(e);
    }
}