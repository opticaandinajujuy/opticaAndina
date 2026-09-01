const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    category: {
      type: String,
      enum: ['sol', 'contacto', 'receta', 'accesorios', 'liquidos_contacto', 'estuches_contacto'],
      required: true,
    },
    subcategory: {
      type: String,
      enum: ['panos', 'colgantes', 'liquidos'],
      required: false,
    },
    price: { type: Number, min: 0 },
    images: [{ type: String }], // Cloudinary URLs
    measurements: { type: String, default: '' },
    features: [{ type: String }],
    sizes: [{ type: String }],
    active: { type: Boolean, default: true },
    stock: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
