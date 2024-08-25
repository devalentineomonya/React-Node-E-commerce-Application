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
  price: { type: Number, required: true },
  shortDescription: { type: String },
  longDescription: { type: String },
  label: { type: String, enum: ["BestSelling", "Popular", "Featured", "Trending","New", "MostSelling"] },
  type: { type: String },
  additionalInfo: { type: Map, of: String },
  sizes: [sizeSchema],
  images: [imageSchema],
  colorVariants: [colorVariantSchema],
  stock: { type: Number, required: true },
  brand: [{ type: Schema.Types.ObjectId, ref: "Brand" }],
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
