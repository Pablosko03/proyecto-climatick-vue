<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h2 class="title">Consulta el clima</h2>
    <div class="search-container">
      <div class="input-wrapper">
        <input
          type="text"
          id="ciudad"
          placeholder="Introduce una ciudad"
          v-model="ciudad"
          @input="sugerirCiudades"
          @keypress="funcionEnter"
        />
        <div  @click="limpiarBusquedaInput">
          <span v-if="ciudad" class="clear-icon">X</span>
        </div>
      </div>
      <button @click="obtenerClima">Buscar</button>  
    </div>
    <ul class="options" id="sugerencias"></ul>

    <div id="resultado"></div>

    <div class="clima-hoy">
      <div id="iconoClima"></div>
      <div id="tempActual">🌡 --°C</div>
      <div id="humedadActual">💧 --%</div>
    </div>

    <div class="proximos-dias">
      <h3>Próximos días</h3>
    <div class="dias"></div>

    </div>
  </div>
</template>

<style scoped>
.title{
  text-align: center;
  margin-bottom: 20px;
}
.home {
  display: flex;
  flex-direction: column;
  width: 600px;
  margin: 0 auto;
}
.search-container {
  display: flex;
  align-items: center;
  width: 100%;
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
.options{
  cursor: pointer;
  list-style: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;

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
import {auth} from '@/firebase/config'
import LogIn from "./LogIn.vue";

export default {
  data() {
    return {
      ciudad: ''
    };
  },
  methods: {
      sugerirCiudades,
      obtenerClima,
      limpiarBusquedaInput(){
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
            onAuthStateChanged(auth,(user) =>{
                if(user){
                    const uid = user.uid
                    this.message = 'Usuario logueado ' + user.email
                }else{
                    this.message = 'No hay usuario logueado'
                }
        })
    }
};

</script>
