const mongoose = require("mongoose");


const chatRoomsSchema = new mongoose.Schema(
  {
    
    userFrom: { type: mongoose.Schema.Types.ObjectId, ref: "user",required:true },
    userTo: { type: mongoose.Schema.Types.ObjectId, ref: "user",required:true },
    is_deleted: { type: Boolean, default: false },
    deleted_at: { type: Date },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const ChatRoom = mongoose.model("chatRoom", chatRoomsSchema);

module.exports = ChatRoom;
