import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore.js';
import { toastWarning } from '../lib/toast.js';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let sessionExpiredNotified = false;

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const hadToken = Boolean(useAuthStore.getState().token);

    if (error.response?.status === 401 && isAdminRoute && hadToken) {
      useAuthStore.getState().logout();
      if (!sessionExpiredNotified) {
        sessionExpiredNotified = true;
        toastWarning('Tu sesión venció. Iniciá sesión de nuevo para seguir.');
      }
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;
