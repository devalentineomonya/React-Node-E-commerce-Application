const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deliverySchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  deliveryDate: { type: Date, default: Date.now }, 
  deliveryAddress: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
  status: { type: String, enum: ['Delivered'], default: 'Delivered' }, 
}, { timestamps: true });

module.exports = mongoose.model('Delivery', deliverySchema);
