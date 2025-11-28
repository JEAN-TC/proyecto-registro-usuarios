<template>
  <div class="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn min-h-screen">
    
    <!-- Header Explorar -->
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h2 class="text-3xl font-bold text-white mb-2">Explorar Momentos</h2>
        <p class="text-slate-400">Descubre lo que está pasando hoy en el mundo.</p>
      </div>
      
      <!-- Barra de búsqueda -->
      <div class="relative group w-full md:w-auto">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size="18" class="text-slate-500 group-focus-within:text-purple-400 transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="Buscar personas, temas..." 
          class="block w-full md:w-80 pl-10 pr-4 py-3 border border-slate-800 rounded-xl leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 sm:text-sm transition-all shadow-sm"
        />
      </div>
    </div>

    <!-- Categorías (Tags) -->
    <div class="flex gap-2 overflow-x-auto pb-6 mb-2 scrollbar-hide">
      <button v-for="(cat, i) in categories" :key="i" 
        :class="[
          'px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all',
          i === 0 ? 'bg-white text-slate-900' : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'
        ]">
        {{ cat }}
      </button>
    </div>

    <!-- Grid Masonry (Simulado con columns) -->
    <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      <div v-for="post in posts" :key="post.id" class="group relative break-inside-avoid mb-6">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)] transform hover:-translate-y-1">
          <!-- Header del Post -->
          <div class="p-3 flex items-center justify-between border-b border-white/5">
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 border border-slate-700">
                {{ post.user.charAt(0) }}
              </div>
              <span class="text-sm font-medium text-slate-200">{{ post.user }}</span>
            </div>
            <span class="text-xs text-slate-500">{{ post.time }}</span>
          </div>

          <!-- Cuerpo / Imagen Placeholder -->
          <div :class="['w-full relative overflow-hidden group-hover:brightness-110 transition-all', post.height, post.color]">
            <div class="absolute inset-0 flex items-center justify-center text-white/10 group-hover:scale-110 transition-transform duration-700">
              <ImageIcon size="48" />
            </div>
            
            <!-- Overlay al hacer hover -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p class="text-white font-bold text-lg mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{{ post.title }}</p>
              <div class="flex items-center justify-between mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                <div class="flex gap-4">
                  <button class="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 transition-colors">
                    <Heart size="18" class="fill-current" /> <span class="text-xs font-bold">{{ post.likes }}</span>
                  </button>
                  <button class="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors">
                    <MessageCircle size="18" /> <span class="text-xs font-bold">{{ post.comments }}</span>
                  </button>
                </div>
                <button class="text-slate-300 hover:text-white p-1.5 rounded-full hover:bg-white/10">
                   <Share2 size="16" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón Cargar Más -->
    <div class="mt-12 flex justify-center">
      <button class="px-6 py-3 bg-slate-900 border border-slate-800 rounded-full text-slate-300 hover:text-white hover:border-purple-500 transition-all flex items-center gap-2">
         <Filter size="18" /> Cargar más inspiración
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  Search, Heart, MessageCircle, Share2, ImageIcon, Filter 
} from 'lucide-vue-next';

const categories = ref(['Para ti', 'Tendencias', 'Arte Digital', 'Fotografía', 'Tecnología', 'Música', 'Cine']);

const posts = ref([
  { id: 1, user: 'Ana.Design', color: 'bg-purple-900', height: 'h-64', title: 'Neon Nights en Tokyo', likes: '1.2k', comments: 45, time: '2h' },
  { id: 2, user: 'PixelArt', color: 'bg-blue-900', height: 'h-80', title: 'Concepto Abstracto #4', likes: '850', comments: 12, time: '4h' },
  { id: 3, user: 'TravelerX', color: 'bg-indigo-900', height: 'h-72', title: 'Montañas Azules', likes: '2.4k', comments: 89, time: '5h' },
  { id: 4, user: 'CodeMaster', color: 'bg-slate-800', height: 'h-60', title: 'Setup Minimalista', likes: '560', comments: 34, time: '1d' },
  { id: 5, user: 'CyberPunk', color: 'bg-fuchsia-900', height: 'h-96', title: 'Futuro Distópico', likes: '3.1k', comments: 120, time: '1d' },
  { id: 6, user: 'PhotoSoul', color: 'bg-rose-900', height: 'h-64', title: 'Retrato Urbano', likes: '900', comments: 22, time: '2d' },
  { id: 7, user: 'Ana.Design', color: 'bg-purple-900', height: 'h-64', title: 'Neon Nights en Tokyo', likes: '1.2k', comments: 45, time: '2h' },
  { id: 8, user: 'PixelArt', color: 'bg-blue-900', height: 'h-80', title: 'Concepto Abstracto #4', likes: '850', comments: 12, time: '4h' },
]);
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>
