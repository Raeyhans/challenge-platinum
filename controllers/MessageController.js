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

exports.initChat = async (req,res,next) => {
    try{
        const {
            user: {
                id: customerId
            },
            body: {
                sellerID
            }
        } = req;

        const chatGroup = `${customerId}-${sellerID}`;
        
        await db.Messages.findOrCreate({
            where: {
                chat_group: chatGroup
            },
            defaults: {
                chat_group: chatGroup,
                message: 'Percakapan dimulai',
                created_by: customerId,
                updated_by: customerId,
            }
        });
        res.status(200).json(chatGroup);

    }catch (e) {
        next(e);
    }
}

exports.getHistoryChat = async (req,res,next) => {
    try{
        const {
            user: {
                id: customerId
            },
            params: {
                chatGroup
            }
        } = req;

        const messages = await db.Messages.findAll({
            where: {
                chat_group: chatGroup
            },
            limit: 31,
        });

        res.status(200).json(messages);
    }catch (e) {
        console.log(e);
        next(e);
    }
}

exports.getSeller = async (req,res,next) => {
    try{
        const {
            user: {
                id: sellerId
            },
            params: {
                chatGroup
            }
        } = req;

        const other = chatGroup.split('-')[1];
        const data = await db.Sellers.findByPk(other);

        res.status(200).json(data);
    }catch (e) {
        console.log(e);
        next(e);
    }
}

exports.getCustomer = async (req,res,next) => {
    try{
        const {
            user: {
                id: customerId
            },
            params: {
                chatGroup
            }
        } = req;

        const other = chatGroup.split('-')[0];
        const data = await db.Customers.findByPk(other);

        res.status(200).json(data);
    }catch (e) {
        console.log(e);
        next(e);
    }
}