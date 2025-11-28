// src/stores/authStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { userServiceAPI, setAuthHeader } from '../services/apiService';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
  // --- STATE ---
  const token = ref(localStorage.getItem('token') || '');
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}'));
  const loading = ref(false); // Nuevo estado para la carga
  const router = useRouter();

  // Guardar el token en la cabecera de Axios si ya existe al cargar la página
  if (token.value) {
    setAuthHeader(token.value);
  }

  // --- ACTIONS ---

  async function register(payload: any) {
    loading.value = true;
    try {
      await userServiceAPI.post('/auth/register', payload);
      router.push('/login');
    } catch (error) {
      console.error('Error en el registro:', error);
      // No relanzar el error para asegurar que finally se ejecute
    } finally {
      loading.value = false;
    }
  }

  async function login(payload: any) {
    loading.value = true;
    try {
      const { data } = await userServiceAPI.post('/auth/login', payload);
      token.value = data.token;
      user.value = data.user;
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setAuthHeader(data.token);
      router.push('/');
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      // No relanzar el error para asegurar que finally se ejecute
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    token.value = '';
    user.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuthHeader('');
    router.push('/login');
  }

  return {
    token,
    user,
    loading, // Exponer el estado de carga
    register,
    login,
    logout,
  };
});
