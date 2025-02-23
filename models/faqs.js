const mongoose = require("mongoose");
const {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
  STATUS_DELETED,
  STATUS_PENDING,
} = require("../config/constants");

const faqSchema = new mongoose.Schema({
  question: { type: String, trim: true,required:true },
  answer: {
    type: String,
    trim: true,
    required:true
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required:true },
  status: {
    type: String,
    required: true,
    enum: [STATUS_ACTIVE, STATUS_INACTIVE, STATUS_DELETED, STATUS_PENDING],
    default: STATUS_ACTIVE,
  },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
  deleted_at: { type: Date },
});

const Notification = mongoose.model("faq", faqSchema);

module.exports = Notification;
