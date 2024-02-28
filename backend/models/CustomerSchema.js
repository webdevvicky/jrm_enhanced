const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  mobileNumber: { type: Number, required: true },
  alternateMobile: { type: Number },
  password: { type: String, required: true, select: false },
  profilePicture: String,
  projectName: { type: String, required: true },
  projectAddress: { type: String, required: true },
  projectLocation: { type: String, required: true },
  fileNumber: { type: Number, required: true },
  pinCode: { type: String, required: true },
  alternateMobile: { type: Number },
  alternateEmail: { type: String },
  created:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },

  startDate: { type: Date },
  completionDate: { type: Date },
  isCompleted: { type: Boolean, default: false },
  completedDate: { type: Date },
  role: { type: String, enum: ['customer'], default: 'customer' }, // Add role field
}, {
  timestamps: true,
});

customerSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }

  next();
});

// Create a case-insensitive index for the email field
customerSchema.index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
