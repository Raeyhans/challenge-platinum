const jwt = require('jsonwebtoken');

const mustAuthenticated = async (socket, next) => {
    const auth = socket.handshake.auth
    try {
      if (auth) {
        const token = auth.token;
        const decodedToken = jwt.verify(token, 'secret');
        
        const {id: userID, role: userRole} = decodedToken;
    
        socket.userID = userID;
        socket.userRole = userRole;
        return next();
      } else {
        throw new Error('ERROR')
      }
    } catch (error) {
      return next(new Error('Invalid authentication'))  
    }
  }
  
  module.exports = mustAuthenticated;
  