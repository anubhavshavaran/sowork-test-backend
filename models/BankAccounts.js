const mongoose = require("mongoose");
const { Schema } = mongoose;

const BankAccountsSchema = new Schema({
    account_type: {
        type: String,
    },
    account_number: {
        type: String,
        required: true,
    },
    isPrimary: {
        type: Boolean,
        required: true,
    },
    account_holder_name: {
        type: String,
        required: true,
    },
    bank_name: {
        type: String,
        required: true,
    },
    ifsc_code: {
        type: String,
        required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});


const User = mongoose.model("BankAccounts", BankAccountsSchema);

module.exports = User;