const jwt = require('jsonwebtoken');

exports.mustloginJwt = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    }catch{
        return res.json({
            msg: 'You are not logged in.'
        });
    }
}