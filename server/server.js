const express = require('express');
const cors = require('cors');
const sockets = require('socket.io');
const Message = require('./models/tiles.model');

const app = express();
const PORT = 8000;

require('./config/mongoose.config');
app.use(cors());
app.use(express.json(), express.urlencoded({extended: true}));

const server = app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

const io = sockets(server);
io.on("connection", socket => {
    console.log(`${socket.id} has joined the channel!`);
    socket.emit("handshake");

    socket.on('joinRoom', roomName => {
        socket.join(roomName);
    });

    socket.on('message', data => {
        socket.to(data.room).emit('message', data.message);
    })

    socket.on('createMessage', data => {
        socket.broadcast.emit('newMessage', Message.create(data));
    });
});
