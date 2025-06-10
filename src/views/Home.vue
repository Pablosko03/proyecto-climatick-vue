<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h2 class="title">Consulta el clima</h2>
    <div class="search-container">
      <div class="input-wrapper">
        <input type="text" id="ciudad" placeholder="Introduce una ciudad" v-model="ciudad" @input="sugerirCiudades"
          @keypress="funcionEnter" />
        <div @click="limpiarBusquedaInput">
          <span v-if="ciudad" class="clear-icon">X</span>
        </div>
      </div>
      <Button class="buttonvue" @click="searchButton()"  icon="pi pi-search" severity="primary" rounded aria-label="Search" />

    </div>
    <ul class="options" id="sugerencias"></ul>

    <div class="boxflex">
      <div class="weather-section">
        <div class="weather-today">
          <div id="resultado"></div>
          <div class="icon-center">
            <div id="iconoClima"></div>
          </div>
          <div class="bottom-data">
            <div id="tempActual">🌡 --°C</div>
            <div id="humedadActual">💧 --%</div>
          </div>
        </div>
        <div class="proximos-dias">
          <div class="dias"></div>
        </div>
      </div>

      <div class="map">
        <Mapa />
      </div>
    </div>
    <div class="chatbot">
      <ChatButton v-if="isLoggedIn" />
    </div>
  </div>
</template>

<style>

.map{
  width: 800px;
}
.map h3{
  text-align: center;
}
.boxflex {
  display: flex;
  justify-content: space-between;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.home {
  display: flex;
  flex-direction: column;
  height: 900px;
  justify-content: space-between;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 1rem;
}

.input-wrapper {
  position: relative;
  align-items: center;
  display: flex;
  flex: 1;
}

.clear-icon {
  position: absolute;
  right: 0.5rem;
  transform: translateY(-50%);
  font-size: 20px;
  color: black;
  cursor: pointer;
}

.options {
  cursor: pointer;
  list-style: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  text-align: center;
}

.weather-section {
  width: 650px;
}

.proximos-dias {
  margin-left: 20%;
}

.weather-today {
  width: 650px;
  height: 360px;
  margin-bottom: 40px;
  border: 2px solid black;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
}

#resultado {
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
}

.icon-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

#iconoClima img {
  width: 260px;
  height: 260px;
  object-fit: contain;
}

.bottom-data {
  display: flex;
  justify-content: center;
  gap: 40px;
  align-items: center;
}

#tempActual {
  font-size: 1.8rem;
  font-weight: bold;
  background-color: rgb(101, 164, 219);
  padding: 8px 16px;
  border-radius: 10px;
}

#humedadActual {
  font-size: 1.8rem;
  font-weight: bold;
  background-color: rgb(101, 164, 219);
  padding: 8px 16px;
  border-radius: 10px;
}

</style>

<script>
import {
  sugerirCiudades,
  obtenerClima,
  limpiarBusqueda,
  funcionEnter,
} from "../utils/clima.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/firebase/config'
import LogIn from "./LogIn.vue";
import Mapa from "@/components/Mapa.vue";
import { ref } from 'vue'
import ChatButton from '@/components/ChatButton.vue'
import { Toast } from "primevue";
import Button from 'primevue/button';
import 'primeicons/primeicons.css'



export default {
  data() {
    return {
      ciudad: '',
      isLoggedIn : false
    };
  },
  components: {
    LogIn,
    Mapa,
    ChatButton,
    Toast,
    Button
  },
  methods: {
    sugerirCiudades,
    obtenerClima,
    limpiarBusquedaInput() {
      this.ciudad = '';
      limpiarBusqueda();
    },
    async searchButton(){
      const data = await obtenerClima();
      console.log(data);

      const temperatura = data.main.temp;
      const viento = data.wind.speed;

      if (temperatura > 33){
        this.$toast.add({ severity: 'info', summary: 'Warning', detail: 'Temperatura muy alta', life: 3000 });
      } else if (temperatura < 0) {
        this.$toast.add({ severity: 'info', summary: 'Error', detail: 'Temperatura muy baja', life: 3000 });
      } else if (viento > 20) {
        this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Viento fuerte', life: 3000 });
      } else {
        this.$toast.add({ severity: 'info', summary: 'Success', detail: 'Clima obtenido correctamente', life: 3000 });
      }
      
    },

    funcionEnter,

    login() {
      localStorage.setItem('isLoggedIn', 'true');
      updateUI();
    },

    logout() {
      localStorage.removeItem('isLoggedIn');
      updateUI();
    },

    updateUI() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      document.getElementById('LogIn').style.display = isLoggedIn ? 'none' : 'inline-block';
      document.getElementById('Registro').style.display = isLoggedIn ? 'none' : 'inline-block';
      document.getElementById('LogOut').style.display = isLoggedIn ? 'inline-block' : 'none';
      window.onload = updateUI;
    },

  },


  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.isLoggedIn = true
        this.message = 'Usuario logueado ' + user.email
      } else {
        this.isLoggedIn = false
        this.message = 'No hay usuario logueado'
      }
    })
  }
};

</script>
