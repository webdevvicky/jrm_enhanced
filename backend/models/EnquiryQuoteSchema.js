const mongoose = require('mongoose');

const enquiryQuotationSchema = new mongoose.Schema({
  enquiryId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Enquiry'},
    date: { type: Date, default: Date.now },
    rev: { type: Number, required: true  },
    isConstruction:{type:Boolean,default:false},
    totalValue: { type: Number, required: true  },
    isApproved:{type:Boolean, default:false},
    isRejected:{type:Boolean, default:false},
    approvedId:{
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
  status:{type:Boolean, default:true},
  items: [
    {
      id: Number,
      description: String,
      sqft: Number,
      unit: String,
      rate: Number,
      amount: Number,
    },
  ],
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
},
{
  timestamps: true,
});

const EnquiryQuotation = mongoose.model('EnquiryQuotation', enquiryQuotationSchema);

module.exports = EnquiryQuotation;