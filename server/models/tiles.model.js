const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    name: String,
    content: String,
    type: String
  },
  {timestamps: true}
);

const Message = new mongoose.model('Message', MessageSchema);
module.exports = Message;
