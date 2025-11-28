<template>
  <div class="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-fuchsia-500 selection:text-white overflow-x-hidden">
    
    <template v-if="authStore.token">
      <!-- Dashboard View (Authenticated) -->
      <DashboardView />
    </template>

    <template v-else>
      <!-- Public/Landing View (Unauthenticated) -->
      <nav 
        :class="[
          'fixed top-0 w-full z-50 transition-all duration-300 border-b',
          isScrolled 
            ? 'bg-slate-950/80 backdrop-blur-md border-slate-800 py-3 shadow-lg shadow-purple-900/10' 
            : 'bg-transparent border-transparent py-5'
        ]"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between">
            
            <!-- Logo: Gradiente Púrpura/Rosa igual que tu Login -->
            <div class="flex items-center gap-2 cursor-pointer group" @click="$router.push('/')">
              <div class="w-8 h-8 rounded-lg bg-linear-to-br from-purple-600 to-pink-600 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-shadow">
                <Share2 class="text-white w-5 h-5" />
              </div>
              <span class="text-2xl font-bold bg-linear-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-gradient">
                Momento
              </span>
            </div>

            <!-- Menú Desktop -->
            <div class="hidden md:flex items-center space-x-16">
              <router-link to="/" class="text-sm font-medium text-white hover:text-white transition-colors relative group">
                Home
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </router-link>
              <router-link to="/explore" class="text-sm font-medium text-white hover:text-white transition-colors relative group">
                Explorar
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </router-link>
              <router-link to="/community" class="text-sm font-medium text-white hover:text-white transition-colors relative group">
                Comunidad
                <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 transition-all group-hover:w-full"></span>
              </router-link>
              <div class="h-6 w-px bg-slate-800"></div>
              <button @click="$router.push('/login')" class="text-slate-300 hover:text-white font-medium text-sm transition-colors">
                Iniciar Sesión
              </button>
              <button @click="$router.push('/register')" class="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-purple-900/20 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 transition-all">
                Registrarse
              </button>
            </div>

            <!-- Botón Menú Móvil -->
            <div class="md:hidden">
              <button 
                @click="isMobileMenuOpen = !isMobileMenuOpen"
                class="text-slate-300 hover:text-white p-2"
              >
                <X v-if="isMobileMenuOpen" :size="24" />
                <Menu v-else :size="24" />
              </button>
            </div>
          </div>
        </div>

        <!-- Menú Móvil Desplegable -->
        <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 p-4 space-y-10 animate-fadeIn">
          <router-link to="/" @click="isMobileMenuOpen = false" class="block px-4 py-3 rounded-lg hover:bg-white/5 text-white hover:text-white font-medium">Home</router-link>
          <router-link to="/explore" @click="isMobileMenuOpen = false" class="block px-4 py-3 rounded-lg hover:bg-white/5 text-white hover:text-white font-medium">Explorar</router-link>
          <router-link to="/community" @click="isMobileMenuOpen = false" class="block px-4 py-3 rounded-lg hover:bg-white/5 text-white hover:text-white font-medium">Comunidad</router-link>
          <div class="h-px bg-slate-800 my-2"></div>
          <button @click="$router.push('/login'); isMobileMenuOpen = false" class="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 text-white hover:text-white font-medium">
            Iniciar Sesión
          </button>
          <button @click="$router.push('/register'); isMobileMenuOpen = false" class="w-full text-center bg-linear-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg font-bold shadow-lg mt-2">
            Crear Cuenta Gratis
          </button>
        </div>
      </nav>

      <main class="pt-[70px]"> <!-- Ajusta el padding-top para compensar la barra fija -->
        <router-view />
      </main>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Menu, X, Share2 } from 'lucide-vue-next';
import { useAuthStore } from './stores/authStore';
import DashboardView from './components/DashboardView.vue';

const authStore = useAuthStore();
const router = useRouter();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

// No longer needed here, DashboardView handles its own logout
// const handleLogout = () => {
//   authStore.logout();
//   router.push('/login');
// };

// Remove the conditional rendering based on isLoggedIn and related states
// The router will handle navigation to different views when unauthenticated.
</script>
