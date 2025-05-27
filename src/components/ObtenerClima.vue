<!-- components/ClimaHoy.vue -->
<template>
    <section class="datos-clima">
        <div class="hoy">
        <h3>Clima de hoy</h3>
        <div id="iconoClima">
            <img v-if="iconoUrl" :src="iconoUrl" alt="Icono clima" />
        </div>
        <div class="detalles">
            <span>🌡 {{ temperatura }}°C</span>
            <span>💧 {{ humedad }}%</span>
        </div>
        <p id="resultado">{{ descripcion }}</p>
        </div>
    </section>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ ciudad: String })
const apiKey = 'b221ee79be96d11caa33bea05c8901f2'

const temperatura = ref('--')
const humedad = ref('--')
const descripcion = ref('')
const iconoUrl = ref('')

watch(
    () => props.ciudad,
    async (ciudad) => {
        if (!ciudad) return

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`

        try {
        const res = await fetch(url)
        const datos = await res.json()

        if (res.ok) {
            temperatura.value = Math.round(datos.main.temp)
            humedad.value = datos.main.humidity
            descripcion.value = datos.weather[0].description
            const icon = datos.weather[0].icon
            iconoUrl.value = `https://openweathermap.org/img/wn/${icon}@2x.png`
        } else {
            descripcion.value = `Error: ${datos.message}`
        }
        } catch {
        descripcion.value = 'Error al obtener el clima.'
        }
    },
    { immediate: true }
)
</script>
