<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h2>Consulta el clima</h2>

    <input
      type="text"
      id="ciudad"
      placeholder="Introduce una ciudad"
      @input="sugerirCiudades"
      @keypress="funcionEnter"
    />
    <ul id="sugerencias"></ul>

    <button @click="obtenerClima">Buscar</button>
    <button @click="limpiarBusqueda">Limpiar</button>

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
  methods: {
      sugerirCiudades,
      obtenerClima,
      limpiarBusqueda,
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
