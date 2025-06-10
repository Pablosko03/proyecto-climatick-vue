<template>
  <main>
    <Buscador @ciudadSeleccionada="ciudad = $event" />
    <ClimaHoy :ciudad="ciudad" />
    <Pronostico :ciudad="ciudad" />
    
  </main>
  <div id="app">
    <Header></Header>
    <Sidebar></Sidebar>
    <router-view />
    <ChatButton />
    <Popup :show="showPopup" @close="showPopup = false" />
  </div>

  <Toast />

</template>

<script>
import Buscador from '@/components/Buscador.vue'
import ClimaHoy from './components/ClimaHoy.vue'
import Pronostico from './components/Pronostico.vue'
import ChatBot from './components/ChatBot.vue'

import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Popup from './components/Popup.vue'
import ChatButton from './components/ChatButton.vue'
import Toast from 'primevue/toast';

export default {
  components: {
    Header,
    Sidebar,
    Popup,
    Toast,
    ChatButton,
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");</style>
