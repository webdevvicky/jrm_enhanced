const mongoose = require('mongoose');

const remarksSchema = new mongoose.Schema({
  date: { type: Date, default:Date.now  },
  comment: { type: String, required: true },
});

const enquirySchema = new mongoose.Schema({
  priority: { type: Number, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  email: { type: String, required: true },
  fileNumber:{type:Number},
  quotationSent: { type: Boolean, required: true ,default:false},
  siteVisit: { type: Boolean, required: true ,default:false},
  officeVisit: { type: Boolean, required: true ,default:false},
  schemeSent: { type: Boolean, required: true,default:false },
  source: { type: String, required: true },
  initialRemark:{type:String,required:true},
  remarks: [{ type: remarksSchema }],
},{timestamps:true});

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
