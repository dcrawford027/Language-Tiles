const mongoose = require('mongoose');

const TilesSchema = new mongoose.Schema(
  {
    name: String,
    content: String,
    type: String
  },
  
  {timestamps: true}
);

const Message = new mongoose.model('Message', TilesSchema);
module.exports = Message;
