const express = require('express');
const cors = require('cors');
const sockets = require('socket.io');
const Message = require('./server/models/tiles.model');
// const { default: Messages } = require('./client/src/components/Messages/Messages');

const app = express();
const PORT = 8000;

require('./server/config/mongoose.config');
app.use(cors());
app.use(express.json(), express.urlencoded({extended: true}));

const server = app.listen(PORT, () => console.log(`Connection established. Listening on port: ${PORT}`));

const io = sockets(server);
io.on("connection", async function(socket) {
    console.log(`A new user has joined! The id is ${socket.id}`) // added on 9/22

    socket.emit("firstConnect", await Message.find({}));

    socket.on('joinroom', data => {
        socket.join(data);
        console.log(Object.keys(io.sockets.connected)); // all users sitting in lobby
        console.log(io.of('/').adapter.clients);
        socket.emit('showConnected'); // added on 9/23
    });

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} has disconnected`);
    });

    socket.on('messages', data => { // added on 9/23 need to add this in server side instead
        socket.to(data.roomName).emit('messages', data.content);
        Message.create(data); // added on 9/23
    });
    
    socket.on('createMessage', async data => {
        socket.broadcast.emit('newMessage', await Message.create(data));
    });
});
