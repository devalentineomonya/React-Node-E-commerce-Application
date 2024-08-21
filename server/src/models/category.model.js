const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
