const mongoose = require('mongoose');

const poSchema = new mongoose.Schema({
  projectId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    date: { type: Date, default: Date.now },
    poNumber: { type: Number, required: true  },
    stage:{type:String,required:true ,lowercase: true},
    meterialCatagory:{type:String,required:true},
    vendorId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor'},
    subTotal: { type: Number, required: true  },
    sgst: { type: Number, required: true  },
    cgst: { type: Number, required: true  },
    totalAmount: { type: Number, required: true  },
    isApproved:{type:Boolean, default:false},
    approvedId:{
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    isVerified:{type:Boolean, default:false},
    verifiedId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
      },
      created:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
      },
    status:{type:Boolean, default:true},
  items: [
    {
      id: Number,
      description: String,
      meterialFor: String,
      quantity: Number,
      unit: String,
      rate: Number,
    },
  ],
});

const PurchaseOrder = mongoose.model('PurchaseOrder', poSchema);
module.exports = PurchaseOrder;    