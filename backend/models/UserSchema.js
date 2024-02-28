const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

// Define the roles as an enum
const RoleEnum = ['admin','generalmanager', 'projectmanager',"architech","coordinater","siteengineer","marketting"];

// Define the user schema
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
  },
  mobileNumber: { type: String, required: true },
  alternateMobileNumber: String,
  employeeId: { type: String, required: true, unique: true },
  joiningDate: { type: Date, required: true },
  endDate: Date,
  active: { type: Boolean, default: true },
  salaryDetails: {
    currentSalary: { type: Number, required: false },
    incrementDetails: [
      {
        incrementDate: { type: Date },
        incrementAmount: { type: Number },
      }
    ]
  },
  role: { type: String, enum: RoleEnum, required: true },
  position:{type:String},
  profilePicture: String,
  password: { type: String, required: false, },
});

// Hash the password before saving
UserSchema.pre('save', function (next) {
  if (this.isModified('password') && this.password && this.password.length >= 2) {
    const saltRounds = 10;
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

// Create a case-insensitive index for the email field
UserSchema.index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

module.exports = mongoose.model('User', UserSchema);
