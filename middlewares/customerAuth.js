const jwt = require('jsonwebtoken');
const db = require('../models');

exports.customerLoginJwt = async (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');
        const customer = await db.Users.findByPk(decoded.id);
            
        if(seller != null){
            req.user = customer.toJSON();
            return next();
        }
        throw new Error('Invalid credentials.');

    }catch{
        return res.json({
            msg: 'You are not logged in.'
        });
    }
}