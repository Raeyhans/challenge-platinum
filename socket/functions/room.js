const room = ({ socket }) => {
    socket.on("join_room", roomName => {
      console.log(roomName);
      socket.join(roomName);
    })
  
    socket.on("leave_room", roomName => {
      socket.leave(roomName);
    })
  }
  
module.exports = room;
  