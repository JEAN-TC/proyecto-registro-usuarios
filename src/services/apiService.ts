// src/services/apiService.ts
import axios from 'axios';

// Instancia de Axios para el User Service
const userServiceAPI = axios.create({
  baseURL: import.meta.env.VITE_USER_SERVICE_API_URL || 'http://localhost:3001', // Puerto por defecto para user-service
  headers: {
    'Content-Type': 'application/json',
  },
});

// Instancia de Axios para el Matching Service
const matchingServiceAPI = axios.create({
  baseURL: import.meta.env.VITE_MATCHING_SERVICE_API_URL || 'http://localhost:3002', // Puerto por defecto para matching-service
  headers: {
    'Content-Type': 'application/json',
  },
});

// Función para añadir el token JWT a las cabeceras de las peticiones
// La usaremos en el authStore después del login
export const setAuthHeader = (token: string) => {
  if (token) {
    // Se aplica a ambas instancias
    userServiceAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    matchingServiceAPI.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete userServiceAPI.defaults.headers.common['Authorization'];
    delete matchingServiceAPI.defaults.headers.common['Authorization'];
  }
};

export { userServiceAPI, matchingServiceAPI };
