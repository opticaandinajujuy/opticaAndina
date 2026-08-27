import api from './api.js';

export const createQuote = (formData) =>
  api.post('/quotes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const getQuotes = (params) => api.get('/quotes', { params });
export const updateQuoteStatus = (id, status) =>
  api.patch(`/quotes/${id}/status`, { status });
export const updateQuote = (id, data) => api.put(`/quotes/${id}`, data);
export const deleteQuote = (id) => api.delete(`/quotes/${id}`);
