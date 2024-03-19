const mongoose = require('mongoose');

const contractorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    category: { type: String },
    rate: { type: String },
    alternateMobile: { type: Number },
    alternatePerson: { type: String },
    permanentAddress: { type: String },
    temporaryAddress: { type: String },
    accountDetails: {
        accountNumber: { type: Number },
        branchName: { type: String },
        ifsc: { type: String },
        upi: { type: String }
    },
    idProofType: { type: String },
    idProofNumber: { type: String },
    isApproved: { type: Boolean, default: false },
    isRejected:{ type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Contractor = mongoose.model('Contractor', contractorSchema);

module.exports = Contractor;
