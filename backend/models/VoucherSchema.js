const mongoose = require('mongoose');

const VoucherSchema = new mongoose.Schema({
        project: {  type: mongoose.Schema.Types.ObjectId,
        ref: 'Project' },
        voucherNumber:{ type:Number},
        poNumber:{type:Number},
        date: { type: Date, default: Date.now },
        description: { type: String, required: true },
        paymentAmount:{ type:Number},
        paymentMode: { type: String, required: true },
        createdBy: {  type: mongoose.Schema.Types.ObjectId,
            ref: 'User' },
        verifiedBy: {  type: mongoose.Schema.Types.ObjectId,
                ref: 'User' },
       ApprovedBy: {  type: mongoose.Schema.Types.ObjectId,
        ref: 'User' },
        isApproved:{type:Boolean,default:false},
        isVerified:{type:Boolean,default:false},
        isRejected:{type:Boolean,default:false},
   

},{timestamps:true});

const   Voucher = mongoose.model('Voucher', VoucherSchema);

module.exports = Voucher;