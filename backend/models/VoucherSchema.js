const mongoose = require('mongoose');

const VoucherSchema = new mongoose.Schema({
    projectId: {  type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer' },
        voucherNumber:{ type:Number},
        voucherDate: { type: Date, default: Date.now },
        paymentAmount:{ type:Number},
        paymentMethod: { type: String, required: true },
        description: { type: String, required: true },
        printedById: {  type: mongoose.Schema.Types.ObjectId,
            ref: 'User' },
        transferredById: {  type: mongoose.Schema.Types.ObjectId,
                ref: 'User' },
        receiverId: {  type: mongoose.Schema.Types.ObjectId,
                    ref: 'User' },


    status:{type:Boolean,default:true},
   
   // uploadedby: { type: mongoose.Schema.Types.ObjectId, ref: 'employeeinfo' },

});

const   Voucher = mongoose.model('Voucher', VoucherSchema);

module.exports = Voucher;