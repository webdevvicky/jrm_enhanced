const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const RoleEnum = ['admin', 'generalmanager', 'projectmanager', 'leadarchitech', 'architech', 'coordinater', 'siteengineer', 'marketting', 'others'];

const IncrementDetailSchema = new Schema({
  incrementDate: { type: String },
  incrementAmount: { type: Number,},
});

const SalaryDetailsSchema = new Schema({
  currentSalary: { type: Number },
  incrementDetails: [IncrementDetailSchema],
});

const IdProofDetailsSchema = new Schema({
  idType: { type: String, },
  idNumber: { type: String,  },
});

const AccountDetailsSchema = new Schema({
  accountNumber: { type: Number,  },
  ifsc: { type: String, },
  gpay: { type: Number },
});

const PersonalDetailsSchema = new Schema({
  fatherName: String,
  fatherPhoneNumber: Number,
  motherName: { type: String, },
  motherPhoneNumber: { type: Number, },
});

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
  joiningDate: { type: String, required: true },
  endDate: String,
  active: { type: Boolean, default: true },
  dateOfBirth: String,
  bloodGroup: String,
  personalDetails: PersonalDetailsSchema,
  address: String,
  salaryDetails: SalaryDetailsSchema,
  accountDetails: AccountDetailsSchema,
  idProofDetails: IdProofDetailsSchema,
  selectedOptions: [{ value: String, label: String }],
  allowedRoutes: [{ type: String }],
  role: { type: String, enum: RoleEnum, required: true },
  designation: String,
  department: String,
  profilePicture: String,
  password: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

UserSchema.pre('validate', async function (next) {
  if (this.isModified('role') && this.role === 'admin') {
    const existingAdmin = await mongoose.model('User').findOne({ role: 'admin' });
    if (existingAdmin && existingAdmin._id.toString() !== this._id.toString()) {
      const err = new Error('There can only be one user with admin role.');
      next(err);
    }
  }
  next();
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password') && this.password && this.password.length >= 2) {
    const saltRounds = 10;
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

UserSchema.index({ email: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

module.exports = mongoose.model('User', UserSchema);
