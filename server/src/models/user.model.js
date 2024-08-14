const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: String },
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['Male', "Female", "Others", "M", "F", "O"] },
  dateOfBirth: { type: Date },
  password: {
    type: String,
    required: function () { return !this.googleId; }
  },
  primaryPhoneNumber: { type: String },
  secondaryPhoneNumber: { type: String },
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  recentItems: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  likedItems: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  deliveries: [{ type: Schema.Types.ObjectId, ref: 'Delivery' }],
  vouchers: [{ type: Schema.Types.ObjectId, ref: 'Voucher' }],
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  verificationCodeExpires: { type: Date },
  passwordResetCode: { type: String, default: null },
  passwordResetCodeExpires: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
