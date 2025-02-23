const mongoose = require("mongoose");


const chatSchema = new mongoose.Schema(
  {
   
    userFrom: { type: mongoose.Schema.Types.ObjectId, ref: "user",required:true },
    userTo: { type: mongoose.Schema.Types.ObjectId, ref: "user",required:true },
    message: {
      type: String,
      default: null
    },
    image: {
      type: Object,
      default: null
    },
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

const Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;
