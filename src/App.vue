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

    <Popup :show="showPopup" @close="showPopup = false" />
  </div>
</template>

<script>
import Buscador from '@/components/Buscador.vue'
import ClimaHoy from './components/ClimaHoy.vue'
import Pronostico from './components/Pronostico.vue'
import ChatBot from './components/ChatBot.vue'

import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Popup from './components/Popup.vue'

export default {
  components: {
    Header,
    Sidebar,
    Popup
  },
  data() {
    return {
      showPopup: false,
      ciudad: ""
    }
  },
  methods: {
    checkIfUserHasSeenPopup() {
      const hasSeenPopup = localStorage.getItem('hasSeenPopup')

      // si no se ha mostrado antes, mostrar el popup
      if (!hasSeenPopup) {
        this.showPopup = true
        localStorage.setItem('hasSeenPopup', true)
      }
    }
  },
  mounted() {
    this.checkIfUserHasSeenPopup()
  }
}

</script>
