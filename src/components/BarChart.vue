<template>
  <!-- Main container card -->
  <div class="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg">
    <!-- Header section -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
      <!-- Title and Subtitle -->
      <div>
        <h3 class="text-lg font-bold text-white">Rendimiento de Usuarios</h3>
        <p class="text-sm text-slate-400 mt-1">Análisis de crecimiento y actividad</p>
      </div>
      <!-- Time range selection buttons -->
      <div class="flex items-center gap-2 mt-4 sm:mt-0 rounded-lg bg-slate-800 p-1">
        <button @click="setTimeRange('6m')" class="px-3 py-1 text-sm font-medium rounded-md transition-colors" :class="timeRange === '6m' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-700'">
          6M
        </button>
        <button @click="setTimeRange('1y')" class="px-3 py-1 text-sm font-medium rounded-md transition-colors" :class="timeRange === '1y' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-700'">
          1A
        </button>
        <button @click="setTimeRange('all')" class="px-3 py-1 text-sm font-medium rounded-md transition-colors" :class="timeRange === 'all' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:bg-slate-700'">
          Todo
        </button>
      </div>
    </div>

    <!-- Chart container -->
    <div class="h-[300px]">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, type ChartOptions, type TooltipItem } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

// --- Mock Data ---
const allTimeData = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    {
      label: 'Nuevos Usuarios',
      backgroundColor: 'rgba(168, 85, 247, 0.8)', // Purple
      borderColor: 'rgba(168, 85, 247, 1)',
      borderRadius: 6,
      data: [65, 59, 80, 81, 56, 55, 70, 75, 90, 85, 95, 110],
      tension: 0.4,
    },
    {
      label: 'Usuarios Activos',
      backgroundColor: 'rgba(236, 72, 153, 0.8)', // Pink
      borderColor: 'rgba(236, 72, 153, 1)',
      borderRadius: 6,
      data: [45, 40, 60, 65, 42, 45, 55, 58, 70, 68, 75, 90],
      tension: 0.4,
    },
  ],
};

const timeRange = ref<'6m' | '1y' | 'all'>('6m');

const chartData = computed(() => {
  let labels = allTimeData.labels;
  let datasets = allTimeData.datasets.map(ds => ({ ...ds, data: [...ds.data] }));

  if (timeRange.value === '6m') {
    labels = labels.slice(-6);
    datasets.forEach(ds => (ds.data = ds.data.slice(-6)));
  }
  
  return { labels, datasets };
});

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#94a3b8', // slate-400
        font: {
          size: 14,
        }
      }
    },
    tooltip: {
      backgroundColor: '#1e293b', // slate-800
      titleColor: '#f1f5f9', // slate-100
      bodyColor: '#cbd5e1', // slate-300
      borderColor: '#334155', // slate-700
      borderWidth: 1,
      padding: 12,
      callbacks: {
        label: function (context: TooltipItem<'bar'>) {
          return `${context.dataset.label}: ${context.raw} usuarios`;
        },
      },
    },
    datalabels: {
      anchor: 'end' as const,
      align: 'top' as const,
      color: '#cbd5e1', // slate-300
      font: {
        weight: 'bold' as const,
        size: 12,
      },
      formatter: (value: number) => {
        return value > 0 ? value : null;
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#334155', // slate-700
      },
      ticks: {
        color: '#94a3b8', // slate-400
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#94a3b8', // slate-400
      },
    },
  },
};

const setTimeRange = (range: '6m' | '1y' | 'all') => {
  timeRange.value = range;
};
</script>

