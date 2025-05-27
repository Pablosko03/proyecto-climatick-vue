<template>
  <main>
    <Buscador @ciudadSeleccionada="ciudad = $event" />
    <ClimaHoy :ciudad="ciudad" />
    <Pronostico :ciudad="ciudad" />
    <ChatBot />
  </main>
    <div id="app">
      <Header></Header>
      <Sidebar></Sidebar>
      <router-view />
    </div>
</template>

<script>
import { ref } from 'vue'
import Buscador from '@/components/Buscador.vue'
import ClimaHoy from './components/ClimaHoy.vue'
import Pronostico from './components/Pronostico.vue'
import ChatBot from './components/ChatBot.vue'
import LogIn from './views/LogIn.vue'
import Register from '@/views/Register.vue'

import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  components: {
    Header,
    Sidebar,
  },
}

const ciudad = ref('')
</script>
