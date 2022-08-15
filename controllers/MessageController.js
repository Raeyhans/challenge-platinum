const db = require('../models');

exports.getConversation = async (req,res,next) => {
    try{
        const {
            user: {
                id: userId,
                role: roleUser
            }
        } = req;

        let selectOption = `m.id_seller as id, s.firstname`;
        let whereOption = `m.id_customer = ${userId}`;
        let joinOption =  `sellers s ON m.id_seller = s.id`;
        if(roleUser == 'seller'){
            selectOption = `m.id_customer as id, c.firstname`;
            whereOption = `m.id_seller = ${userId}`;
            joinOption = `customers c ON m.id_customer = c.id`;
        }


        const messages = await db.sequelize.query(`SELECT distinct ON (m.chat_group) m.chat_group, m.message, ${selectOption} FROM messages m
            LEFT JOIN ${joinOption}
            WHERE ${whereOption} ORDER BY m.chat_group, m.id DESC`, {
            type: db.sequelize.QueryTypes.SELECT
        });

        res.status(200).json(messages);

    }catch (e) {
        next(e);
    }
}

exports.initChat = async (req,res,next) => {
    try{
        const {
            user: {
                id: customerId,
                role: roleUser
            },
            body: {
                sellerID
            }
        } = req;

        let chatGroup = `cs${customerId}-sl${sellerID}`;
        if(roleUser == 'seller'){
            chatGroup = `cs${sellerID}-sl${customerId}`;
        }
        
        await db.Messages.findOrCreate({
            where: {
                chat_group: chatGroup
            },
            defaults: {
                chat_group: chatGroup,
                message: 'Percakapan dimulai',
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

        const other = chatGroup.split('-')[1].replace('sl', '');
        const data = await db.Sellers.findByPk(other);

        res.status(200).json(data);
    }catch (e) {
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

        const other = chatGroup.split('-')[0].replace('cs', '');
        const data = await db.Customers.findByPk(other);

        res.status(200).json(data);
    }catch (e) {
        next(e);
    }
}