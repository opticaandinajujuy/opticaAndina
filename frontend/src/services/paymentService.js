import api from './api.js';

export const createPaymentPreference = (productId, buyerName, buyerPhone, quantity = 1) =>
  api.post('/payments/preference', { productId, buyerName, buyerPhone, quantity });
