<template>
    <section class="datos-clima">
        <div class="hoy">
            <h3>Clima de hoy</h3>
            <div class="icono" id="iconoClima">
            <!-- Aquí se mostrará el ícono del clima -->
            <img v-if="iconoUrl" :src="iconoUrl" alt="Ícono clima" />
        </div>
        <div class="detalles">
            <span id="tempActual">🌡 {{ temperatura }}°C</span>
            <span id="humedadActual">💧 {{ humedad }}%</span>
        </div>
            <p id="resultado">{{ descripcion }}</p>
        </div>
    </section>
</template>

<script setup>
import { ref, watch } from 'vue'

// Datos simulados, reemplazar con datos reales de API o props
const temperatura = ref('--')
const humedad = ref('--')
const descripcion = ref('Ingresa una ciudad para ver el clima.')
const iconoUrl = ref('')

// Función para actualizar datos, se puede recibir vía props o mediante eventos
// Aquí dejo un ejemplo simple de actualización

// Aquí podrías exponer un método o usar props para recibir la data desde el padre
</script>
