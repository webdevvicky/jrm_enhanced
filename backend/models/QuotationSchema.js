const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
  projectId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    date: { type: Date, default: Date.now },
    rev: { type: Number, required: true  },
    isAdditional:{type:Boolean,default:false},
    isInterior:{type:Boolean,default:false},
    isRevised:{type:Boolean,default:false},
    isConstruction:{type:Boolean,default:false},
    totalValue: { type: Number, required: true  },
    isApproved:{type:Boolean, default:false},
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
  created:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
},
{
  timestamps: true,
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;