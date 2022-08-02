const config = require('../config/config');
const mustAuthenticated = require('./middlewares/mustAuthentication');
const Server = require('socket.io').Server;
const room = require('./functions/room');
const chat = require('./functions/chat');

const onConnection = (io) => {

    io.use(mustAuthenticated)
  
    io.on("connection", (socket) => {
      console.log("connected");
      socket.join('room-' + socket.userID)
  
      socket.emit("connected", true)
  
      socket.broadcast.emit("userConnected", {
        user_id: socket.userID
      })
  
      room({ socket, io })
  
      chat({ socket, io })
  
  
      socket.on("disconnect", async () => {
        const matchingSockets = await io.in(socket.userID).allSockets()
  
        const isDisconnected = matchingSockets.size === 0;
  
        if (isDisconnected) {
          socket.broadcast.emit("userDisconnected", socket.userID);
  
          try {
            
            socket.leave('room-' + socket.userID)
            
          } catch (error) {
            console.log(JSON.stringify(error))
            // logger.error(JSON.stringify(error))
          }
  
        }
      })
    });

    // io.on('connection', (socket) => {
    //   console.log('Connected...')
    //   socket.on('message', (msg) => {
    //       socket.broadcast.emit('message', msg)  // sending message to everone except the sender
    //   })
  
  // })
  };
  
function initSocket(httpServer) {
    console.log(config.socket.path)
    // logger.info('Socket initiated');
  
    const io = new Server(httpServer, {
      cors: '*',
    });
  
    const ioServer = io.of(config.socket.path);
  
    onConnection(ioServer);
  }
  
  module.exports = initSocket;  