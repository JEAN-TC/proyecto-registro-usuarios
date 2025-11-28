<template>
  <div class="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn min-h-screen">
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Columna Principal: Grupos -->
      <div class="lg:col-span-2">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-white">Tus Tribus</h2>
          <button class="text-sm text-purple-400 hover:text-purple-300 font-medium">Ver todo</button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div v-for="community in communities" :key="community.id" class="bg-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 hover:bg-slate-800/60 hover:border-purple-500/30 transition-all duration-300 group cursor-pointer relative overflow-hidden">
            <!-- Efecto hover de fondo -->
            <div class="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div class="relative z-10">
              <div class="flex justify-between items-start mb-4">
                <div :class="['w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300', community.bg]">
                  <component :is="community.icon" size="24" :class="community.color" />
                </div>
                <button class="text-xs font-bold text-slate-400 border border-slate-700 px-3 py-1 rounded-full hover:text-white hover:border-purple-500 hover:bg-purple-500/10 transition-all">
                  Unirse
                </button>
              </div>
              
              <h3 class="text-lg font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{{ community.name }}</h3>
              <p class="text-slate-400 text-sm mb-4 line-clamp-2">{{ community.desc }}</p>
              
              <div class="flex items-center gap-4 pt-4 border-t border-white/5">
                <span class="text-xs text-slate-500 flex items-center gap-1.5">
                  <Users size="14" /> {{ community.members }} miembros
                </span>
                <div class="flex -space-x-2">
                  <div v-for="i in 3" :key="i" class="w-5 h-5 rounded-full bg-slate-700 border border-slate-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Compass size="20" class="text-pink-500" /> Descubrir más
        </h3>
        
        <div class="space-y-4">
          <div v-for="i in 3" :key="i" class="flex items-center justify-between p-4 rounded-xl bg-slate-900/30 border border-slate-800 hover:bg-slate-900/50 transition-colors">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg bg-slate-800 animate-pulse"></div>
              <div>
                <div class="h-4 w-32 bg-slate-800 rounded mb-2"></div>
                <div class="h-3 w-48 bg-slate-800/50 rounded"></div>
              </div>
            </div>
            <button class="p-2 text-slate-500 hover:text-white">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <!-- Columna Lateral: Tendencias -->
      <div class="lg:col-span-1">
        <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sticky top-28 backdrop-blur-md">
          <div class="flex items-center gap-2 mb-6 text-white font-bold text-xl">
            <TrendingUp class="text-green-400" /> Tendencias
          </div>

          <div class="space-y-6">
            <div v-for="(trend, i) in trends" :key="trend.id" class="group cursor-pointer">
              <div class="flex justify-between items-start">
                <span class="text-xs text-slate-500 mb-1 block">
                  {{ i + 1 }} · Tendencia global
                </span>
                <MoreHorizontal size="16" class="text-slate-600 group-hover:text-slate-400" />
              </div>
              <h4 class="text-white font-bold group-hover:text-purple-400 transition-colors">{{ trend.tag }}</h4>
              <span class="text-sm text-slate-400">{{ trend.posts }} posts</span>
            </div>
          </div>

          <button class="w-full mt-8 py-3 rounded-xl bg-slate-800 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-all">
            Mostrar más
          </button>
        </div>

        <!-- Banner Promo -->
        <div class="mt-6 rounded-2xl p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/20 text-center">
          <Flame class="w-8 h-8 text-orange-400 mx-auto mb-3" />
          <h4 class="text-white font-bold mb-2">Momento Premium</h4>
          <p class="text-slate-400 text-sm mb-4">Desbloquea análisis exclusivos y personalización avanzada.</p>
          <button class="px-4 py-2 bg-white text-purple-900 font-bold rounded-lg text-sm hover:bg-slate-200 transition-colors w-full">
            Prueba Gratis
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { 
  Zap, ImageIcon, Globe, Heart, Users, Compass, 
  ChevronRight, TrendingUp, MoreHorizontal, Flame 
} from 'lucide-vue-next';

const communities = ref([
  { id: 1, name: 'Diseño UI/UX', members: '14k', desc: 'Compartiendo interfaces y recursos.', icon: Zap, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 2, name: 'Fotografía Nocturna', members: '8.5k', desc: 'Capturando la luz en la oscuridad.', icon: ImageIcon, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 3, name: 'Devs Frontend', members: '22k', desc: 'React, Vue, Tailwind y más.', icon: Globe, color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { id: 4, name: 'Arte Digital', members: '10k', desc: 'Ilustración y modelado 3D.', icon: Heart, color: 'text-orange-400', bg: 'bg-orange-500/10' },
]);

const trends = ref([
  { id: 1, tag: '#CyberMonday', posts: '45.2k' },
  { id: 2, tag: '#ReactJS', posts: '12.5k' },
  { id: 3, tag: '#NeonVibes', posts: '8.9k' },
  { id: 4, tag: '#Photography', posts: '150k' },
]);
</script>
