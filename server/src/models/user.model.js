const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: function() { return !this.googleId; } 
  },
  primaryPhoneNumber: { type: String},
  secondaryPhoneNumber: { type: String },
  address: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
  recentItems: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  likedItems: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  isActive: { type: Boolean, default: false },
  verificationCode: { type: String },
  verificationCodeExpires: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
