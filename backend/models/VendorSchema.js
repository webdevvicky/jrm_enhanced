const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  gst: { type: String,  },
  accountDetails: {
    accountNumber: { type: Number },
    branchName: { type: String },
    ifsc: { type: String },
    upi: { type: String }
  },
  items: { type: String },
  rate: { type: String },
  mobileNumber: { type: Number, required: true },
  landlineNumber: { type: Number },
  alternateNumber: { type: Number },
  salesPersonName: { type: String },
  salesPersonMobile: { type: Number },
  ownerName: { type: String },
  ownerNumber: { type: Number },
  isApproved: { type: Boolean, default: false },
  isRejected: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isActive:{type:Boolean,default:true}
}, { timestamps: true });

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;