const Voucher = require('../models/VoucherSchema')

async function calculateTotalPayableAmount(vouchers) {
    let totalPayableAmount = 0;
    for (const voucherId of vouchers) {
      const voucher = await Voucher.findById(voucherId);
      if (voucher && voucher.isApproved) {
        totalPayableAmount += voucher.payableAmount;
      }
    }
    return totalPayableAmount;
  }

  module.exports =  calculateTotalPayableAmount