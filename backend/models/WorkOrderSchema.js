const mongoose = require('mongoose');
const commonFields = require ("./CommonFields")

const workOrderSchema = new mongoose.Schema({
    project:{ type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    date: { type: Date, default: Date.now },
    woNumber: { type: Number, required: true  },
    contractor:{ type: mongoose.Schema.Types.ObjectId, ref: 'Contractor'},
    totalAmount: { type: Number, required: true  },
    status:{type:Boolean, default:true},
     items: [
    {
    date:{type:Date, default:Date.now},
      description: String,
      unit: String,
      qty: Number,
      rate: Number,
    },
  ],
  terms:[
    {
        date:{type:Date, default:Date.now},
        description: String,
    }
  ],
  vouchers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Voucher' }],
  isPendingPayment:{type:Boolean, default:true},

  ...commonFields
});

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);
module.exports = WorkOrder;    