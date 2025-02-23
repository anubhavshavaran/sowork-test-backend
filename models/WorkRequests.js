const mongoose = require("mongoose");
const { Schema } = mongoose;

const BankAccountsSchema = new Schema({

    package: { type: mongoose.Schema.Types.ObjectId, ref: "package" },
    customPrice: {
        type: Number,
    },
    deliveryIn: {
        type: Number,
    },
    deliverables: {
        type: String,
    },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    jobName: { type: String, },
    jobDescription: { type: String, },
    jobType: { type: String, },
    eventType: { type: String, },
    startDate: { type: String, },
    endDate: { type: String, },
    endTime: { type: String, },
    startTime: { type: String, },
    location: { type: Object, },
    workCustomStatus: {type : [{}]},
    attachments: { type: [Object] ,default:null},
    status: {
        type: String,
        required: true,
        default:"Active",
        enum: ["Active","Pending","Finish","Rejected"],
    },
    intermidentWorkStatus: {
        type: String,
        required: true,
        default:"NA",
        enum: ["NA","PaymentPending","ArtistFinish"],
    },
    
},{
    timestamps:true
});


const User = mongoose.model("Works", BankAccountsSchema);

module.exports = User;