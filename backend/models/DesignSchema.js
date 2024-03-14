const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  fileName: String,
  designFile: String,
  project: {type: mongoose.Schema.Types.ObjectId,
    ref:'Project'},
  isApproved:{type:Boolean, default:false},

}, {
  timestamps: true,
});

const Design = mongoose.model('Design', designSchema);

module.exports = Design;