<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h2>Climatik el clima a un click</h2>
    <div class="search-container">
      <div class="input-wrapper">
        <input type="text" id="ciudad" placeholder="Introduce una ciudad" v-model="ciudad" @input="sugerirCiudades"
          @keypress="funcionEnter" />
        <div @click="limpiarBusquedaInput">
          <span v-if="ciudad" class="clear-icon"> <i class="pi pi-times"></i></span>
        </div>
      </div>
      <Button class="buttonvue" @click="getWeather" icon="pi pi-search" severity="primary" rounded
        aria-label="Search" />

    </div>
    <ul class="options" id="sugerencias" @click="getWeather"></ul>

    <div class="boxflex">
      <div class="weather-section" :class="{ oculto: !shoWeather }">
        <div class="weather-today">
          <div id="resultado"></div>
          <div class="icon-center">
            <div id="iconoClima"></div>
          </div>
          <div class="bottom-data">
            <div id="tempActual">🌡 --°C</div>
            <div id="humedadActual"> 💧--%</div>
          </div>
        </div>
        <div class="proximos-dias">
          <div class="dias"></div>
        </div>
      </div>

      <div class="map" :class="{ centrado: !shoWeather }">
        <Mapa />
      </div>
    </div>
    <div class="chatbot">
      <ChatButton v-if="isLoggedIn" />
    </div>
    <div class="banner"></div>
  </div>
</template>

<style>
.oculto {
  display: none;
}
.weather-section {
  flex: 1;
}
.map{
  flex: 1;
  transition: all 0.5s ease;
}
.map.centrado {
  margin: 0 auto;
  flex: 0 1 100%;
  max-width: 800px;
}
.map {
  width: 800px;
}
.map h3 {
  text-align: center;
}

.boxflex {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 1rem;
  flex-wrap: wrap;
}


.home {
  display: flex;
  flex-direction: column;
  height: 900px;
  justify-content: space-between;

  & h2 {
    text-align: center;
    font-family: "Bricolage Grotesque", sans-serif;
    font-size: 30px;
    font-weight: 400;
    margin-bottom: 1rem;
    color: #fff;
}
  }


.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 1rem;
  gap: 0.5rem;
}

input {
  background: #fff;
  color: #2b2b2b;
}

.input-wrapper {
  position: relative;
  align-items: center;
  display: flex;
  flex: 1;
}

.clear-icon {
  position: relative;
  right: 1.7rem;
  font-size: 20px;
  color: #2b2b2b;
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
  background-image: url("https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExY2FzMWE0ZG8yN3hrOXUwbWNsaGh2aXk3eHl1a3V4dW5zbHloNG1rbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/k3CeSrt9IZ6aorWCy1/giphy.gif");
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 40px;
  border: 2px solid #fff;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
}

#resultado {
  font-size: 1.5rem;
  text-align: center;
  font-weight: 400;
  font-family: Roboto, sans-serif;
  border-bottom: #fff 2px solid;
  width: 100%;
  padding: 10px 0 0 0;
  color: #fff;
  background: #ffffff5b;
  

}

.icon-center {
  display: flex;
  padding-left: 2rem;
  position: relative;
  bottom: 1rem;
}

#iconoClima img {
  width: 260px;
  height: 240px;
  object-fit: contain;
  overflow: hidden;
  object-fit: cover;

}

.bottom-data {
  display: flex;
  position: relative;
  justify-content: start;
  padding-left: 5rem;
  gap: 40px;
  align-items: center;
  bottom: 2rem;
}

#tempActual {
  font-size: 1.8rem;
  font-weight: 600;
  background-color: #2128bd;
  padding: 8px 16px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
}

#humedadActual {
  font-size: 1.8rem;
  font-weight: 600;
  background-color: #2128bd;
  padding: 8px 16px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
}

.banner {
    height: 150px;
    width: 100%;
    display: flex;
    object-fit: cover;
    background-image: url("../public/img/banner.jpg");

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
import ChatButton from '@/components/ChatButton.vue'
import { Toast } from "primevue";
import Button from 'primevue/button';
import 'primeicons/primeicons.css'



export default {
  data() {
    return {
      ciudad: '',
      isLoggedIn : false,
      shoWeather : false
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
    limpiarBusquedaInput() {
      this.ciudad = '';
      limpiarBusqueda();
      this.shoWeather = false
    },
    async searchButton() {
      const data = await obtenerClima();
      console.log(data);

      const temperatura = data.main.temp;
      const viento = data.wind.speed;

      if (temperatura > 33) {
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
      //this.updateUI();
    },

    logout() {
      localStorage.removeItem('isLoggedIn');
      //this.updateUI();
    },

    updateUI() {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      document.getElementById('LogIn').style.display = isLoggedIn ? 'none' : 'inline-block';
      document.getElementById('Registro').style.display = isLoggedIn ? 'none' : 'inline-block';
      document.getElementById('LogOut').style.display = isLoggedIn ? 'inline-block' : 'none';
      window.onload = this.updateUI;
    },
    async getWeather(){
      const exito = await obtenerClima()
      this.shoWeather = exito
    }

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
      
      
        console.log("onAuthStateChanged ejecutado", user);
    })
  }
};

</script>
