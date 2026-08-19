import api from './api.js';

export const login = (credentials) => api.post('/auth/login', credentials);
