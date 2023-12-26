const mongoose = require("mongoose");

const messageModel = mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, trim: true }, // Fixed typo: Changed 'STring' to 'String'
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" }, // Changed 'chat' to 'Chat' for reference
}, {
  timestamps: true,
});

const Message = mongoose.model("Message", messageModel);

module.exports = Message;
