// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "./assets/css/reset.css";
import "./assets/css/layout.css";
import "./assets/css/components.css";
import "./assets/css/weather.css";
import PrimeVue from 'primevue/config';
import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';

const app =  createApp(App)
const customPrimePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{blue.50}',
      100: '{blue.100}',
      200: '{blue.200}',
      300: '{blue.300}',
      400: '{blue.400}',
      500: '{blue.500}',
      600: '{blue.600}',
      700: '{blue.700}',
      800: '{blue.800}',
      900: '{blue.900}',
      950: '{blue.950}'
    }
  }
})

app.use(PrimeVue, {
  theme: {
    preset: customPrimePreset,
    options: {
      darkModeSelector: false,
    }
  }
});

app.use(ToastService);
app.use(router)

app.use(PrimeVue)
app.mount('#app')

