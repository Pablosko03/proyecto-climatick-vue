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

    

    <div class="clima-hoy">
      <div class="cabecera">
        <div id="resultado"></div>
        <div class="icono-humedad">
          <div id="iconoClima"></div>
          <div id="humedadActual">💧 --%</div>
        </div>
      </div>
      <div class="contenido">
          <div id="tempActual">🌡 --°C</div>
      </div>
</div>

    <div class="proximos-dias">
    <div class="dias"></div>
      
    </div>
  </div>
</template>

<style >
.title{
  text-align: center;
  margin-bottom: 20px;
}
.home {
  display: flex;
  flex-direction: column;
  
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
.options{
  cursor: pointer;
  list-style: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  text-align: center;
}
.clima-hoy{
  background-color: rgb(53, 104, 97);
  max-width: 600px;
  height: auto;
  margin-bottom: 40px;
  border: 2px solid black;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.cabecera{
  position: relative;
  display: flex;
  justify-content: center;
}
.icono-humedad {
  position: absolute;
  right:0;
}
.contenido {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

#iconoClima img{
  width: 160px;
  height: 160px;
  object-fit: contain;
}
#resultado{
  font-size: 1.5rem;
  text-align: center;
  flex: 1;
}
#tempActual{
  font-size: 180%;
  font-weight: bold;
  height: 50px;
  background-color: rgb(101, 164, 219);
  margin-top: 150px;
}
#humedadActual{
  border: 2px solid black;
  border-radius: 7px;
  font-size: 20px;
  width: 120%;
  height: 40px;
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
