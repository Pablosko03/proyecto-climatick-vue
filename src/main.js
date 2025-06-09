// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "./assets/css/reset.css";
import "./assets/css/layout.css";
import "./assets/css/components.css";
import "./assets/css/weather.css";

createApp(App)

.use(router)

.mount('#app')
