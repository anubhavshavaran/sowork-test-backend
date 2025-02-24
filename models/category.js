const mongoose = require("mongoose");
const {
  STATUS_ACTIVE,
  STATUS_INACTIVE,
  STATUS_DELETED,
} = require("../config/constants");

// const subSpecializationSchema = new mongoose.Schema({
//   sub_specialization_name: { type: String },
//   status: {
//     type: String,
//     required: true,
//     enum: [STATUS_ACTIVE, STATUS_INACTIVE, STATUS_DELETED],
//     default: STATUS_ACTIVE,
//   },
// });

// const specializationSchema = new mongoose.Schema({
//   specialization_name: { type: String },
//   status: {
//     type: String,
//     required: true,
//     enum: [STATUS_ACTIVE, STATUS_INACTIVE, STATUS_DELETED],
//     default: STATUS_ACTIVE,
//   },
//   category: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
//   sub_specializations: [subSpecializationSchema],
// });

const categorySchema = new mongoose.Schema({
  category_name: { type: String },
  image: {type: Object,default: null},
  status: {
    type: String,
    required: true,
    enum: [STATUS_ACTIVE, STATUS_INACTIVE, STATUS_DELETED],
    default: STATUS_ACTIVE,
  },
  
  // specializations: [specializationSchema],
  is_deleted: { type: Boolean, default: false },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, default: new Date() },
  deleted_at: { type: Date },
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

categorySchema.virtual('specializations', {
  ref: 'specialization',
  localField: '_id',
  foreignField: 'category'
});


const category = mongoose.model("category", categorySchema);
module.exports = category;
