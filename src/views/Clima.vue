<!-- src/views/Clima.vue -->
<template>
    <div class="clima">
        <input
            id="ciudad"
            type="text"
            placeholder="Ingresa una ciudad"
            @input="sugerirCiudades"
            @keypress="funcionEnter"
        />
        <ul id="sugerencias"></ul>

        <div id="resultado"></div>

        <div class="hoy">
            <div id="iconoClima"></div>
            <div id="tempActual">🌡 --°C</div>
            <div id="humedadActual">💧 --%</div>
        </div>

        <div class="proximos-dias">
            <h3>Próximos días</h3>
            <div class="dias"></div>
        </div>

        <button @click="limpiarBusqueda">Limpiar</button>
    </div>
</template>

<script setup>
import {
    sugerirCiudades,
    obtenerClima,
    limpiarBusqueda,
    funcionEnter,
} from '../utils/clima.js'
</script>

<style scoped>
/* Puedes mover tu CSS aquí */
</style>
