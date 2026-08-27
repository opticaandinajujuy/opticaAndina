const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    unitPrice: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'in_process', 'cancelled'],
      default: 'pending',
    },
    mpPreferenceId: { type: String, default: '' },
    mpPaymentId: { type: String, default: '' },
    payerName: { type: String, default: '' },
    payerEmail: { type: String, default: '' },
    payerPhone: { type: String, default: '' },
    oversold: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
