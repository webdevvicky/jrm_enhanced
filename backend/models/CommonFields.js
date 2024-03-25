const mongoose = require('mongoose');

const userRef = {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
};

const statusDefaults = {
  type: Boolean,
  default: false
};

const commonFields = {
  createdBy: userRef,
  verifiedBy: userRef,
  approvedBy: userRef,
  isApproved: statusDefaults,
  isVerified: statusDefaults,
  isRejected: statusDefaults
};

module.exports = commonFields;
