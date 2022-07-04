const jwt = require('jsonwebtoken');
const db = require('../models');

exports.sellerLoginJwt = async (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');
        const seller = await db.Sellers.findByPk(decoded.id);
            
        if(seller != null){
            req.user = seller.toJSON();
            return next();
        }
        throw new Error('Invalid credentials.');

    }catch{
        return res.json({
            msg: 'You are not logged in.'
        });
    }
}