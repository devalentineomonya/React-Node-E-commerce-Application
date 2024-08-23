const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  logoUrl: { type: String },
  productImage: { type: String },
  website: { type: String }, 
}, { timestamps: true });

module.exports = mongoose.model('Brand', brandSchema);
