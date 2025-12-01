<template>
  <div class="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
    <div class="max-w-7xl mx-auto min-h-screen flex flex-col md:flex-row">
      
      <!-- 1. BARRA LATERAL (Sidebar) -->
      <header class="hidden md:flex flex-col w-20 xl:w-64 fixed h-screen border-r border-slate-800 bg-slate-950/50 backdrop-blur-sm z-20 pt-4 pb-8 px-2 xl:px-6 justify-between">
        <div>
          <!-- Logo -->
          <div class="flex items-center gap-3 mb-8 px-2 cursor-pointer" @click="activeTab = 'home'">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Share2 class="text-white w-6 h-6" />
            </div>
            <span class="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent hidden xl:block">
              Momento
            </span>
          </div>

          <!-- Menú Navegación -->
          <nav class="space-y-2">
            <SidebarItem icon="Home" label="Inicio" :active="activeTab === 'home'" @click="activeTab = 'home'" />
            <SidebarItem icon="Search" label="Explorar" :active="activeTab === 'explore'" @click="activeTab = 'explore'" />
            <SidebarItem icon="Bell" label="Notificaciones" :active="activeTab === 'notifications'" @click="activeTab = 'notifications'" />
            <SidebarItem icon="Mail" label="Mensajes" :active="activeTab === 'messages'" @click="activeTab = 'messages'" />
            <SidebarItem icon="Bookmark" label="Guardados" :active="activeTab === 'bookmarks'" @click="activeTab = 'bookmarks'" />
            <SidebarItem icon="User" label="Perfil" :active="activeTab === 'profile'" @click="activeTab = 'profile'" />
            <SidebarItem icon="Settings" label="Configuración" :active="activeTab === 'settings'" @click="activeTab = 'settings'" />
          </nav>

          <!-- Botón Crear Post -->
          <button class="mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white p-3 xl:py-3 rounded-full font-bold shadow-lg shadow-purple-900/40 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
            <PlusCircle size="24" />
            <span class="hidden xl:inline">Nuevo Momento</span>
          </button>
        </div>

        <!-- Perfil Usuario (Abajo) -->
        <div class="flex items-center gap-3 p-3 rounded-full hover:bg-slate-800 transition-colors cursor-pointer mt-auto">
          <div class="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold text-white">T</div>
          <div class="hidden xl:block flex-1 overflow-hidden">
            <p class="font-bold text-sm text-white truncate">Tu Usuario</p>
            <p class="text-xs text-slate-500 truncate">@tuusuario</p>
          </div>
          <LogOut size="20" class="text-slate-500 hidden xl:block hover:text-red-400" @click="handleLogout" />
        </div>
      </header>

      <!-- Menú Móvil Inferior (Solo visible en móvil) -->
      <div class="md:hidden fixed bottom-0 left-0 w-full bg-slate-950 border-t border-slate-800 z-50 px-6 py-3 flex justify-between items-center">
        <Home size="28" :class="activeTab === 'home' ? 'text-purple-500' : 'text-slate-500'" @click="activeTab = 'home'" />
        <Search size="28" :class="activeTab === 'explore' ? 'text-purple-500' : 'text-slate-500'" @click="activeTab = 'explore'" />
        <div class="w-12 h-12 -mt-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 text-white">
          <PlusCircle size="28" />
        </div>
        <Bell size="28" :class="activeTab === 'notifications' ? 'text-purple-500' : 'text-slate-500'" @click="activeTab = 'notifications'" />
        <User size="28" :class="activeTab === 'profile' ? 'text-purple-500' : 'text-slate-500'" @click="activeTab = 'profile'" />
      </div>

      <!-- 2. COLUMNA CENTRAL (FEED) -->
      <main class="flex-1 md:ml-20 xl:ml-64 border-r border-slate-800 min-h-screen pb-20 md:pb-0">
        <!-- Header Móvil -->
        <div class="md:hidden sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 flex justify-between items-center">
           <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <Share2 class="text-white w-5 h-5" />
           </div>
           <span class="font-bold text-white">Inicio</span>
           <Settings size="24" class="text-slate-400" />
        </div>

        <!-- Stories Rail -->
        <div class="p-4 border-b border-slate-800 overflow-x-auto scrollbar-hide">
          <div class="flex gap-4 min-w-max">
            <div v-for="story in MOCK_STORIES" :key="story.id" class="flex flex-col items-center gap-1 cursor-pointer group">
              <div :class="['w-16 h-16 rounded-full p-[2px]', story.isUser ? 'bg-slate-700' : 'bg-gradient-to-tr from-purple-500 to-pink-500']">
                <div :class="['w-full h-full rounded-full border-2 border-slate-950 flex items-center justify-center text-white font-bold text-xs relative', story.img]">
                  <div v-if="story.isUser" class="absolute bottom-0 right-0 bg-blue-500 rounded-full p-0.5 border-2 border-slate-950"><PlusCircle size="12" fill="white" /></div>
                  {{ story.user.charAt(0) }}
                </div>
              </div>
              <span class="text-xs text-slate-400 group-hover:text-white">{{ story.user }}</span>
            </div>
          </div>
        </div>

        <!-- Composer (Crear Post) -->
        <div class="hidden md:block p-4 border-b border-slate-800">
          <div class="flex gap-4">
            <div class="w-10 h-10 rounded-full bg-purple-600 flex-shrink-0 flex items-center justify-center font-bold text-white">T</div>
            <div class="flex-1">
              <input 
                type="text" 
                placeholder="¿Qué está pasando?" 
                class="w-full bg-transparent text-xl text-white placeholder-slate-500 outline-none mb-4"
              />
              <div class="flex justify-between items-center">
                <div class="flex gap-3 text-purple-400">
                  <ImageIcon size="20" class="cursor-pointer hover:text-purple-300" />
                  <Hash size="20" class="cursor-pointer hover:text-purple-300" />
                  <Globe size="20" class="cursor-pointer hover:text-purple-300" />
                </div>
                <button class="bg-purple-600 hover:bg-purple-500 text-white px-5 py-1.5 rounded-full font-bold text-sm disabled:opacity-50">
                  Publicar
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Feed List -->
        <div class="p-0 md:p-4">
          <template v-if="activeTab === 'home'">
            <FeedPost v-for="post in MOCK_FEED" :key="post.id" :post="post" />
          </template>
          <template v-else>
            <div class="flex flex-col items-center justify-center py-20 text-slate-500">
              <Compass size="48" class="mb-4 text-slate-600" />
              <p>Contenido de {{ activeTab }} próximamente...</p>
              <button @click="activeTab = 'home'" class="mt-4 text-purple-400 hover:underline">Volver al inicio</button>
            </div>
          </template>
        </div>
      </main>

      <!-- 3. COLUMNA DERECHA (WIDGETS) -->
      <aside class="hidden lg:block w-80 pl-6 py-6 pr-6 sticky top-0 h-screen overflow-y-auto">
        
        <!-- Buscador -->
        <div class="relative group mb-6">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size="18" class="text-slate-500 group-focus-within:text-purple-500 transition-colors" />
          </div>
          <input 
            type="text" 
            placeholder="Buscar en Momento" 
            class="block w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-full text-sm text-slate-200 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
          />
        </div>

        <!-- Tendencias -->
        <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 mb-6">
          <h3 class="font-bold text-white text-lg mb-4 px-2">Tendencias para ti</h3>
          <div class="space-y-4">
            <div v-for="(trend, i) in MOCK_TRENDS" :key="trend.id" class="hover:bg-slate-800/50 p-2 rounded-lg cursor-pointer transition-colors">
              <div class="flex justify-between text-xs text-slate-500 mb-0.5">
                <span>Tendencia Global</span>
                <MoreHorizontal size="14" />
              </div>
              <p class="font-bold text-white">{{ trend.tag }}</p>
              <p class="text-xs text-slate-500">{{ trend.posts }} Posts</p>
            </div>
          </div>
          <button class="text-purple-400 text-sm mt-4 px-2 hover:underline">Mostrar más</button>
        </div>

        <!-- A quién seguir -->
        <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
          <h3 class="font-bold text-white text-lg mb-4 px-2">A quién seguir</h3>
          <div class="space-y-4">
            <div v-for="user in MOCK_SUGGESTIONS" :key="user.id" class="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 transition-colors">
              <div class="flex items-center gap-3">
                <div :class="['w-10 h-10 rounded-full flex items-center justify-center font-bold text-white', user.color]">
                  {{ user.name.charAt(0) }}
                </div>
                <div class="overflow-hidden">
                  <p class="font-bold text-white text-sm truncate w-24">{{ user.name }}</p>
                  <p class="text-xs text-slate-500 truncate">{{ user.handle }}</p>
                </div>
              </div>
              <button class="bg-white text-black px-3 py-1.5 rounded-full text-xs font-bold hover:bg-slate-200 transition-colors">
                Seguir
              </button>
            </div>
          </div>
        </div>

        <div class="mt-6 text-xs text-slate-600 px-2 leading-relaxed">
          <a href="#" class="hover:underline">Términos</a> · <a href="#" class="hover:underline">Privacidad</a> · <a href="#" class="hover:underline">Cookies</a> · © 2024 Momento Inc.
        </div>

      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { 
  Share2, Home, Search, Bell, Mail, User, Settings, LogOut, PlusCircle, Bookmark, 
  ImageIcon, Hash, Globe, Compass, MoreHorizontal, Heart, MessageCircle
} from 'lucide-vue-next'; // Import Vue-specific Lucide icons
import SidebarItem from './SidebarItem.vue'; // Will create this
import FeedPost from './FeedPost.vue';     // Will create this

const router = useRouter();
const authStore = useAuthStore(); // Initialize authStore
const activeTab = ref('home');

const MOCK_STORIES = ref([
  { id: 0, user: 'Tú', img: 'bg-purple-600', isUser: true },
  { id: 1, user: 'Ana.D', img: 'bg-blue-500' },
  { id: 2, user: 'Pixel', img: 'bg-green-500' },
  { id: 3, user: 'Travel', img: 'bg-yellow-500' },
  { id: 4, user: 'Cyber', img: 'bg-pink-500' },
  { id: 5, user: 'Photo', img: 'bg-red-500' },
]);

const MOCK_FEED = ref([
  { 
    id: 1, 
    user: 'Ana.Design', 
    avatarBg: 'bg-purple-600',
    content: 'Acabo de terminar este concepto para una app de meditación. ¿Qué opinan del esquema de colores? 🎨✨',
    image: 'h-64 bg-gradient-to-br from-indigo-900 to-purple-800', 
    likes: 1240, 
    comments: 45, 
    time: '2h' 
  },
  { 
    id: 2, 
    user: 'CyberPunk_2077', 
    avatarBg: 'bg-pink-600',
    content: 'La ciudad nunca duerme. Captura nocturna desde el distrito 9. 🌃📸 #NightCity #Photography',
    image: 'h-80 bg-gradient-to-tr from-slate-800 to-black', 
    likes: 3500, 
    comments: 120, 
    time: '4h' 
  },
  { 
    id: 3, 
    user: 'DevMaster', 
    avatarBg: 'bg-blue-600',
    content: 'React 19 trae cosas increíbles. Aquí un pequeño snippet de prueba con las nuevas APIs. 👨‍💻',
    image: null, // Post solo texto
    likes: 850, 
    comments: 89, 
    time: '5h' 
  },
]);

const MOCK_TRENDS = ref([
  { id: 1, tag: '#CyberMonday', posts: '45.2k' },
  { id: 2, tag: '#ReactJS', posts: '12.5k' },
  { id: 3, tag: '#NeonVibes', posts: '8.9k' },
  { id: 4, tag: '#Photography', posts: '150k' },
]);

const MOCK_SUGGESTIONS = ref([
  { id: 1, name: 'Art Station', handle: '@artstation', color: 'bg-blue-500' },
  { id: 2, name: 'Tech Daily', handle: '@techdaily', color: 'bg-green-500' },
  { id: 3, name: 'Minimalist', handle: '@minimal', color: 'bg-slate-500' },
]);

const handleLogout = () => {
  authStore.logout();
  router.push('/login'); 
};
</script>