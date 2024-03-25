const mongoose = require('mongoose');

const poSchema = new mongoose.Schema({
    project:{ type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    date: { type: Date, default: Date.now },
    poNumber: { type: Number, required: true  },
    stage:{type:String,required:true ,lowercase: true},
    meterialCategory:{type:String,required:true},
    vendor:{ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor'},
    subTotal: { type: Number, required: true  },
    sgst: { type: Number, required: true  },
    cgst: { type: Number, required: true  },
    igst: { type: Number, required: true  },
    totalAmount: { type: Number, required: true  },
    isApproved:{type:Boolean, default:false},
    approvedBy:{
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    isVerified:{type:Boolean, default:false},
    verifiedBy:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
      },
      createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
      },
      isRejected:{type:Boolean,default:false},
    status:{type:Boolean, default:true},
  items: [
    {
      item: String,
      meterialFor: String,
      qty: Number,
      unit: String,
      rate: Number,
    },
  ],

  vouchers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Voucher' }],
  isPendingPayment:{type:Boolean, default:true}
});

const PurchaseOrder = mongoose.model('PurchaseOrder', poSchema);
module.exports = PurchaseOrder;    