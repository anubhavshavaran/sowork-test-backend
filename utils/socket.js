const socketIo = require("socket.io");
const ChatModal = require("../models/Chat");

module.exports = (server) => {
  const io = socketIo(server);
  const users = {};

  io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);
  
    // Register a new user with a username
    socket.on('register', (username) => {
      users[username] = socket.id;
      socket.username = username;
      console.log('users:', users);
    });
  
    // Handle private message
    socket.on('private message', async ({ content, to }) => {
      const receiverSocketId = users[to];
      // if (receiverSocketId) {
        const userTo = to.split("_")[0].trim();
        const userFrom = to.split("_")[1].trim();
        console.log(userFrom.trim(),userTo.trim());
       const chatDetails = await ChatModal.create({ userFrom,userTo,message:content });
        io.to(receiverSocketId).emit('private message', {
          content,
          from: socket.username,
          chatDetails
        });
      // }
    });
  
    // Handle user disconnect
    socket.on('disconnect', () => {
      delete users[socket.username];
      console.log('user disconnected:', socket.id);
    });
  });

};
