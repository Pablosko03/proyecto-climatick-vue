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
      <button @click="obtenerClima">Buscar</button>
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

      <div>
        <Mapa />
      </div>
    </div>

  </div>
</template>

<style>
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

export default {
  data() {
    return {
      ciudad: ''
    };
  },
  components: {
    LogIn,
    Mapa
  },
  methods: {
    sugerirCiudades,
    obtenerClima,
    limpiarBusquedaInput() {
      this.ciudad = '';
      limpiarBusqueda();
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
        const uid = user.uid
        this.message = 'Usuario logueado ' + user.email
      } else {
        this.message = 'No hay usuario logueado'
      }
    })
  }
};

</script>
