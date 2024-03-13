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
  password: { type: String, select: false },

  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  },

  role: { type: String, enum: ['customer'], default: 'customer' },
  project:{ type: mongoose.Schema.Types.ObjectId,
    ref:'Project'},
  status:{type:Boolean,default:true}
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

//Create a case-insensitive index for the email field
customerSchema.index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
