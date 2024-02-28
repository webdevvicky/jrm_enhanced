const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  shopName: String,
  shopType: String,
  shopAddress:String,
  meterialsAvailable: String,
  shopMobile: Number,
  shopLandLine: Number,
  AlternateNumber: Number,
  salesPersonName: String,
  salesPersonMobile: Number,
  accountNumber: Number,
  ifsc: String,
  gpay: Number,
}, { timestamps: true });

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;