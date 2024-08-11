const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: { type: String, required: true },
  altText: { type: String }
}, { _id: false });

const colorVariantSchema = new Schema({
  color: { type: String, required: true },
  hexCode: { type: String }
}, { _id: false });

const sizeSchema = new Schema({
  size: { type: String, required: true }
}, { _id: false });

const productSchema = new Schema({
  name: { type: String, required: true },
  shortDescription: { type: String },
  longDescription: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  images: [imageSchema],  
  colorVariants: [colorVariantSchema],  
  sizes: [sizeSchema],  
  type: { type: String }, 
  brand:{type:String}, 
  additionalInfo: { type: Map, of: String },  
  stock: { type: Number, required: true },
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
