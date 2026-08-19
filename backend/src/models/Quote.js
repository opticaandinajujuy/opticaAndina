const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    consultationType: {
      type: String,
      enum: ['sol', 'contacto', 'receta', 'otro'],
      default: 'otro',
    },
    message: { type: String, required: true },
    recipeUrl: { type: String, default: '' }, // Cloudinary URL (image/PDF)
    status: {
      type: String,
      enum: ['pending', 'attended'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quote', quoteSchema);
