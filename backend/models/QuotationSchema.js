const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
    project:{ type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    date: { type: Date, default: Date.now },
    rev: { type: Number, required: true  },
    isAdditional:{type:Boolean,default:false},
    isInterior:{type:Boolean,default:false},
    isConstruction:{type:Boolean,default:false},
    totalValue: { type: Number, required: true  },
    isApproved:{type:Boolean, default:false},
    isRejected:{type:Boolean, default:false},
    approvedBy:{
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

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;