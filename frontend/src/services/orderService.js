import api from './api.js';

export const getOrders = (params) => api.get('/orders', { params });
export const updateOrder = (id, data) => api.put(`/orders/${id}`, data);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);
