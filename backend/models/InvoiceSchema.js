const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' , required: true },
  invoiceNumber: { type: Number, required: true,  },
  date: { type: Date, default: Date.now },
  dueDate:{type:Date},
  address: { type: String },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  rate: { type: Number },
  paymentMade: { type: Number, required: true },
  balanceToBeMade: { type: Number, required: true },
  modeOfPayment: { type: String, required: true },
  refNumber: { type: String, required: true },
  nextDue: { type: String },
  status: { type: Boolean, default: true },
  qty:{type:String},
  isApproved:{type:Boolean,default:false},
  approvedId:{
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  created:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
 
  
},{  timestamps: true});

const Invoice = mongoose.model('Invoice', InvoiceSchema);

module.exports = Invoice