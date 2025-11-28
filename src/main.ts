import './assets/main.css';
import './index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { registerChartJs } from './chartConfig';
import * as Sentry from "@sentry/vue";
import { browserTracingIntegration, replayIntegration } from "@sentry/vue";

// Registrar componentes de Chart.js
registerChartJs();

const app = createApp(App);

// --- Sentry Initialization ---
const sentryDsn = "https://a07bb3814f4adca5ea1c5486ffa4f9dc@o4510018739699712.ingest.us.sentry.io/4510418421809152";
console.log("Inicializando Sentry con DSN:", sentryDsn);

Sentry.init({
  app,
  dsn: sentryDsn,
  integrations: [
    browserTracingIntegration({
      router,
    }),
    replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
// --- Fin de Sentry ---

app.use(createPinia());
app.use(router);

app.mount('#app');
