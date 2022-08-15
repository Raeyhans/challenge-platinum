const jwt = require('jsonwebtoken');
const db = require('../models');

exports.userLoginJwt = (roles = []) => async (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');
        let promise = null;

        if(!roles.includes(decoded.role)){
            throw new Error('Invalid credentials.');
        }
        
        if(decoded.role === 'customer'){
            promise = db.Customers.findByPk(decoded.id);
        }else if(decoded.role === 'seller'){
            promise = db.Sellers.findByPk(decoded.id);
        }else if(decoded.role === 'admin'){
            promise = db.Users.findByPk(decoded.id);
        }else{
            throw new Error('Invalid credentials.');
        }
        const user = await promise;
            
        if(user != null){
            req.user = user.toJSON();
            return next();
        }
        throw new Error('Invalid credentials.');

    }catch{
        return res.status(401).json({
            msg: 'You are not authorized to access this page.'
        });
    }
}