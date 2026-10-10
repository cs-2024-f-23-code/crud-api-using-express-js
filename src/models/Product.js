const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
  description: { type: String, trim: true, maxlength: 2000, default: '' },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, trim: true, maxlength: 80 },
  stock: { type: Number, required: true, min: 0, default: 0, validate: Number.isInteger },
  image: { type: String, default: '' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
productSchema.index({ name: 'text' });
productSchema.index({ category: 1, createdAt: -1 });
productSchema.index({ price: 1 });
module.exports = mongoose.model('Product', productSchema);
