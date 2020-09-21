const express = require('express');
const cors = require('cors');
<<<<<<< HEAD

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => console.log('Listening on port 8000'));
=======
const sockets = require('socket.io');
const Message = require('./server/models/message.model');

const app = express();
const PORT = 8000;

require('./server/config/mongoose.config');
app.use(cors());
app.use(express.json(), express.urlencoded({extended: true}));

const server = app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

const io = sockets(server);
io.on("connection", async function(socket) {
  socket.emit("firstConnect", await Message.find({}));

  socket.on('createMessage', async data => {
    socket.broadcast.emit('newMessage', await Message.create(data));
  });
});
>>>>>>> c305cde22fef0f176d37345c9882ad4d5d5b2c8f
