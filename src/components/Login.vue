<template>
  <div class="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute top-[-10%] left-[-10%] w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-30"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-30"></div>

    <div class="z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
          Momento
        </h1>
        <p class="text-gray-400 text-sm">
          Bienvenido de nuevo.
        </p>
      </div>
      
      <div v-if="error" class="mb-4 bg-red-500/20 border border-red-500 text-red-300 px-4 py-2 rounded-lg text-sm">
        {{ error }}
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-xs font-medium text-gray-400 mb-1 ml-1">Email</label>
          <input 
            type="email" 
            required
            v-model="email"
            class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            placeholder="usuario@ejemplo.com"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-400 mb-1 ml-1">Contraseña</label>
          <input 
            type="password" 
            required
            v-model="password"
            class="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit"
          :disabled="authStore.loading"
          class="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-purple-500/25 active:scale-95 transition-all flex items-center justify-center h-12 mt-3"
        >
          <span v-if="authStore.loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          <span v-else>Iniciar Sesión</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-400">
          ¿No tienes cuenta?
          <router-link to="/register" class="text-white font-medium hover:underline">
            Regístrate
          </router-link>
        </p>
      </div>

      <div class="mt-8 flex items-center justify-center gap-4">
        <p class="text-xs text-gray-500">O ingresa con</p>
        <div class="flex gap-2">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const error = ref<string | null>(null);

    const handleSubmit = async () => {
      error.value = null;
      try {
        await authStore.login({ email: email.value, password: password.value });
        if (authStore.token) {
          router.push('/');
        }
      } catch (err: any) {
        error.value = err.response?.data?.error || 'Error. Credenciales incorrectas.';
      }
    };

    return {
      email,
      password,
      error,
      authStore,
      handleSubmit,
    };
  },
});
</script>

<style>
/* Using a global style tag here because a scoped style tag 
   wouldn't apply to the root element of the component if it has `h-screen`. */
body {
  background-color: #000;
}
</style>