import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // URL base de tu API
});

// Interceptor para agregar el token a cada solicitud
api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  // Interceptor para manejar la respuesta y verificar la expiración del token
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // Si el token ha expirado, elimina el token y redirige a la página de inicio de sesión
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirige a la página de inicio de sesión
      }
      return Promise.reject(error);
    }
  );
  
  export default api;