const db = require('../../models');

const chat = ({ socket, io }) => {
    socket.on("sendPrivateChat", async ({message, id_seller}) => {
  
      try {
        const customer = await db.Customers.findByPk(socket.userID);

        const NewMessage = {
          message,
          from: 'cs' + socket.userID,
          id_customer: socket.userID,
          id_seller: id_seller,
          read_by: JSON.stringify([socket.userID]),
          chat_group: `cs${socket.userID}-sl${id_seller}`,
        };

        const chat = await db.Messages.create(NewMessage)
    
        const chatResponse = {
          "from": chat.from,
          "id_customer": chat.id_customer,
          "id_seller": id_seller,
          "chat_group": chat.chat_group,
          "created_at": chat.created_at,
          "id": chat.id,
          "read_by": socket.userID,
          "message": chat.message,
          "firstname": customer.firstname,
          "user": {
              "id": socket.userID,
          }
        }
    
        const toSocket = 'room-seller' + id_seller
        const fromSocket = 'room-customer' + socket.userID
    
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
          body: `${sender.firstname}: ${message}`
        }
    
        if (isReceiverConnected) {
          socket.to(toSocket).emit("notification", notification)
        } 
        
      } catch (error) {
console.log(error);
        // logger.error(JSON.stringify(error))
      }
    });
  
  }

  const chatSeller = ({ socket, io }) => {
    socket.on("sendPrivateChatSeller", async ({message, id_customer}) => {
  
      try {

        const NewMessage = {
          message,
          from: 'sl' + socket.userID,
          id_customer: id_customer,
          id_seller: socket.userID,
          read_by: JSON.stringify([socket.userID]),
          chat_group: `cs${id_customer}-sl${socket.userID}`,
        };
       
        const chat = await db.Messages.create(NewMessage)
    
        const chatResponse = {
          "from": chat.from,
          "id_customer": id_customer,
          "id_seller": chat.id_seller,
          "chat_group": chat.chat_group,
          "created_at": chat.created_at,
          "id": chat.id,
          "read_by": socket.userID,
          "message": chat.message,
          "user": {
              "id": socket.userID,
          }
        }
        
        const toSocket = 'room-customer' + id_customer
        const fromSocket = 'room-seller' + socket.userID
        
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
          body: `${sender.firstname}: ${message}`
        }
    
        if (isReceiverConnected) {
          socket.to(toSocket).emit("notification", notification)
        } 
        
      } catch (error) {
console.log(error);
        // logger.error(JSON.stringify(error))
      }
    });

  }
  
module.exports = { chat, chatSeller };
  