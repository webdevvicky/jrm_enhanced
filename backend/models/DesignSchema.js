const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  fileName: String,
  designFile: String,
  projectId: String,
}, {
  timestamps: true,
});

const Design = mongoose.model('Design', designSchema);

module.exports = Design;