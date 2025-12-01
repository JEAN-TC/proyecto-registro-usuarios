<template>
  <div class="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 mb-6 hover:bg-slate-900 transition-colors">
    <div class="flex gap-3">
      <!-- Avatar -->
      <div :class="['w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white border border-slate-700', post.avatarBg]">
        {{ post.user.charAt(0) }}
      </div>
      
      <!-- Contenido -->
      <div class="flex-1">
        <div class="flex items-center justify-between mb-1">
          <div class="flex items-center gap-2">
            <span class="font-bold text-white hover:underline cursor-pointer">{{ post.user }}</span>
            <span class="text-slate-500 text-sm">@{{ post.user.toLowerCase().replace('.', '') }} · {{ post.time }}</span>
          </div>
          <button class="text-slate-500 hover:text-white"><MoreHorizontal size="16" /></button>
        </div>
        
        <p class="text-slate-200 mb-3 leading-relaxed whitespace-pre-wrap">{{ post.content }}</p>
        
        <div v-if="post.image" :class="['w-full rounded-xl mb-4 border border-slate-800 overflow-hidden relative group cursor-pointer', post.image]">
           <div class="absolute inset-0 flex items-center justify-center text-white/20 group-hover:scale-110 transition-transform duration-500">
             <ImageIcon size="48" />
           </div>
        </div>

        <!-- Acciones -->
        <div class="flex items-center justify-between text-slate-400 max-w-md">
          <button class="flex items-center gap-2 hover:text-pink-500 group transition-colors">
            <div class="p-2 rounded-full group-hover:bg-pink-500/10 transition-colors">
              <Heart size="18" />
            </div>
            <span class="text-sm">{{ post.likes }}</span>
          </button>
          
          <button class="flex items-center gap-2 hover:text-blue-400 group transition-colors">
            <div class="p-2 rounded-full group-hover:bg-blue-400/10 transition-colors">
              <MessageCircle size="18" />
            </div>
            <span class="text-sm">{{ post.comments }}</span>
          </button>

          <button class="flex items-center gap-2 hover:text-green-400 group transition-colors">
            <div class="p-2 rounded-full group-hover:bg-green-400/10 transition-colors">
              <Share2 size="18" />
            </div>
          </button>
          
          <button class="flex items-center gap-2 hover:text-purple-400 group transition-colors">
            <div class="p-2 rounded-full group-hover:bg-purple-400/10 transition-colors">
              <Bookmark size="18" />
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {
  MoreHorizontal, ImageIcon, Heart, MessageCircle, Share2, Bookmark
} from 'lucide-vue-next';

const props = defineProps({
  post: { type: Object, required: true },
});
</script>
