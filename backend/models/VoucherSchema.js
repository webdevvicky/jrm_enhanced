const mongoose = require('mongoose');
const commonFields = require('./CommonFields');

// Define the valid voucher types
const validTypes = ['purchaseOrder', 'localPurchase', 'workOrder', 'labourPayment', 'pettyCash'];

const VoucherSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: validTypes 
  },
  name: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Project' },
  voucherNumber: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  totalAmount: { type: Number, reqired: true },
  payableAmount: { type: Number, reqired: true },
  balanceAmount: { type: Number },
  paymentMode: { type: String, required: true },
  purchaseOrder: { type: mongoose.Schema.Types.ObjectId, ref: "PurchaseOrder" },
  ...commonFields
}, { timestamps: true });

const Voucher = mongoose.model('Voucher', VoucherSchema);

module.exports = Voucher;
