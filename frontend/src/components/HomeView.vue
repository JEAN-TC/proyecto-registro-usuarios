<script setup lang="ts">
// No script logic is needed here anymore as the navbar is global.
// Icons are still imported for the hero section.
import { Heart, Zap, Globe, ArrowRight } from 'lucide-vue-next';
</script>

<template>
  <div>
    <!-- --- HERO SECTION (Portada) --- -->
    <div class="relative pt-20 pb-28 lg:pt-32 lg:pb-40 overflow-hidden">
      
      <!-- Elementos de fondo (Glow effects) -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none opacity-50 mix-blend-screen"></div>
      <div class="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[100px] -z-10 pointer-events-none opacity-30"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-8 backdrop-blur-sm animate-fade-in-up">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          Nueva versión 2.0 disponible
        </div>

        <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight">
          Captura y comparte <br class="hidden md:block" />
          <span class="bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 bg-clip-text text-transparent animate-gradient">
            tu mundo real
          </span>
        </h1>

        <p class="mt-6 text-xl text-slate-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
          Una plataforma social diseñada para conectar de verdad. 
          Sin filtros innecesarios, solo tú y los momentos que importan con las personas que amas.
        </p>

        <div class="flex flex-col sm:flex-row gap-5 justify-center items-center w-full mb-28">
          <button class="group relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-[0_10px_40px_-10px_rgba(168,85,247,0.5)] hover:shadow-[0_10px_60px_-10px_rgba(168,85,247,0.6)] transition-all transform hover:-translate-y-1 overflow-hidden">
            <span class="relative z-10 flex items-center gap-2">
              Empezar Ahora <ArrowRight :size="20" class="group-hover:translate-x-1 transition-transform"/>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button class="px-8 py-4 rounded-full bg-slate-900 text-slate-200 font-semibold text-lg border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-600">
              <svg class="w-3 h-3 text-white fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            Ver Demo
          </button>
        </div>

        <!-- Estadísticas flotantes / Mockup visual -->
        <div class="mt-20 relative mx-auto max-w-5xl">
          <div class="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-20"></div>
          <div class="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-10">
            
            <!-- Feature 1 -->
            <div class="flex flex-col items-center p-6 rounded-xl hover:bg-white/5 transition-colors">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-5 border border-white/5">
                <Globe class="text-blue-400" :size="28"/>
              </div>
              <h3 class="text-white font-bold text-lg">Global & Local</h3>
              <p class="text-slate-400 text-sm mt-3 text-center">Conecta con personas cerca de ti o alrededor del mundo.</p>
            </div>

            <!-- Feature 2 -->
            <div class="flex flex-col items-center p-6 rounded-xl hover:bg-white/5 transition-colors">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-5 border border-white/5">
                <Zap class="text-purple-400" :size="28"/>
              </div>
              <h3 class="text-white font-bold text-lg">Ultrarrápido</h3>
              <p class="text-slate-400 text-sm mt-3 text-center">Tecnología de punta para compartir en tiempo real sin esperas.</p>
            </div>

            <!-- Feature 3 -->
            <div class="flex flex-col items-center p-6 rounded-xl hover:bg-white/5 transition-colors">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 flex items-center justify-center mb-5 border border-white/5">
                <Heart class="text-pink-400" :size="28"/>
              </div>
              <h3 class="text-white font-bold text-lg">Privacidad Total</h3>
              <p class="text-slate-400 text-sm mt-3 text-center">Tus datos son tuyos. Control total sobre quién ve tu contenido.</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>

    <!-- --- FOOTER SIMPLIFICADO --- -->
    <footer class="border-t border-slate-900 bg-slate-950 py-16">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <p class="text-slate-500 text-sm">
          © 2024 Momento Inc. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Scoped styles can remain if there are any specific to HomeView */
/* The keyframes are now global and this block can be removed if empty */
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
.animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
}
</style>