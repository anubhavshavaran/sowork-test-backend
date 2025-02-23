const mongoose = require("mongoose");
const {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
  STATUS_DELETED,
} = require("../config/constants");

const kycSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    status: {
      type: String,
      required: true,
      enum: [STATUS_ACTIVE, STATUS_INACTIVE, STATUS_DELETED],
      default: STATUS_ACTIVE,
    },
    aadhar_number: {
      type: String,
      required: true,
    },
    aadhar_photo_front: {
      type: Object,
      required: true,
    },
    aadhar_photo_back: {
      type: Object,
      required: true,
    },
    pan_number: {
      type: String,
      required: true,
    },
    pan_photo_front: {
      type: Object,
      required: true,
    },
    pan_photo_back: {
      type: Object,
      required: true,
    },
    selfie: {
      type: Object,
      required: true,
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

const Kyc = mongoose.model("kyc", kycSchema);

module.exports = Kyc;
