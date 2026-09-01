const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, default: '' },
    logoUrl: { type: String, required: true }, // Cloudinary URL
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Brand', brandSchema);
