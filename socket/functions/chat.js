const db = require('../../models');

const chat = ({ socket, io }) => {
    socket.on("sendPrivateChat", async ({content, to}) => {
  
      try {
        const message = {
          content,
          from: socket.userID,
          to,
          read_by: JSON.stringify([socket.userID]),
        };
        console.log(socket.userID);
        const chat = await db.Messages.create(message, {
          to,
          from: socket.userID,
        })
    
        const chatResponse = {
          "chat_group": chat.chat_group,
          "created_at": chat.created_at,
          "id": chat.id,
          "read_by": [socket.userID],
          "message": chat.message,
          "user": {
              "id": socket.userID,
          }
        }
    
        const toSocket = 'room-' + to
        const fromSocket = 'room-' + socket.userID
    
        const isReceiverConnected = io.adapter.rooms.has(toSocket)
        const isSenderConnected = io.adapter.rooms.has(fromSocket)
  
        if (isReceiverConnected) {
          socket.to(toSocket).emit("receivePrivateChat", chatResponse);
        }
  
        if (isSenderConnected) {
          socket.to(fromSocket).emit("receivePrivateChat", chatResponse);
        }
        let ModelSender = null;
    
        if(socket.userRole == 'customer'){
            ModelSender = db.Customers;
        }else{
            ModelSender = db.Sellers;
        }
        
        const [sender] = await Promise.all([
            ModelSender.findByPk(socket.userID),
        ])

        const notification = {
          title: 'Anda Menerima Pesan Baru',
          body: `${sender.firstname}: ${content}`
        }
    
        if (isReceiverConnected) {
          socket.to(toSocket).emit("notification", notification)
        } 
        
      } catch (error) {
console.log(error);
        // logger.error(JSON.stringify(error))
      }
    });
  
    // socket.on(readMessage, async (chatID) => {
    //   try {
    //     const chats = await db.Messages.findAll({where: {
    //       id: {
    //         [Op.in]: chatID
    //       }
    //     }})
  
    //     const readedMessage = [];
  
    //     const updatePromise = chats.map(item => {
    //       let newReadBy = item.parsed_read_by || []
    //       newReadBy.push(socket.userID);
  
    //       newReadBy = uniqBy(newReadBy, item => item)
  
    //       readedMessage.push({
    //         id: item.id,
    //         chat_group: item.chat_group,
    //         id_seller: item.id_seller,
    //         id_customer: item.id_customer,
    //         read_by: newReadBy
    //       })
  
    //       item.read_by = JSON.stringify(newReadBy);
  
    //       return item.save();
    //     })
  
    //     await Promise.all(updatePromise);
  
    //     readedMessage.forEach(item => {
    //       const toSocket = 'room-' + item.to
    //       const fromSocket = 'room-' + item.from
      
    //       const isReceiverConnected = io.adapter.rooms.has(toSocket)
    //       const isSenderConnected = io.adapter.rooms.has(fromSocket)
  
    //       const socketResponse = {
    //         _id: item.id,
    //         chat_group: item.chat_group,
    //         read_by: item.read_by
    //       }
    
    //       if (isReceiverConnected) {
    //         socket.to(toSocket).emit(socketEvent.readMessage, socketResponse);
    //       }
    
    //       if (isSenderConnected) {
    //         socket.to(fromSocket).emit(socketEvent.readMessage, socketResponse);
    //       }
    //     })
  
    //   } catch (error) {
    //     logger.error(JSON.stringify(error))  
    //   }
    // })
  }
  
module.exports = chat;
  