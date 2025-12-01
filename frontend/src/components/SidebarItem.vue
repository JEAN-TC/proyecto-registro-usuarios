<template>
  <button 
    @click="$emit('click')"
    :class="[
      'flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-200 group',
      active 
        ? 'text-white bg-purple-600/10 font-bold' 
        : 'text-slate-400 hover:bg-slate-800/50 hover:text-purple-300'
    ]"
  >
    <component v-if="iconComponent" :is="iconComponent" :size="24" :class="[`transition-transform group-hover:scale-110`, active ? 'text-purple-500 fill-current' : '']" />
    <span class="text-lg hidden xl:block">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import * as LucideIcons from 'lucide-vue-next';

const props = defineProps({
  icon: { type: String, required: true },
  label: { type: String, required: true },
  active: { type: Boolean, default: false },
});

const iconComponent = computed(() => {
  const iconName = props.icon as keyof typeof LucideIcons;
  return LucideIcons[iconName] || null;
});
</script>