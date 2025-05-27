<!-- components/Pronostico.vue -->
<template>
    <section class="proximos-dias">
        <h3>Próximos 5 Días</h3>
        <div class="dias">
        <button v-for="(dia, i) in dias" :key="i" v-html="dia"></button>
        </div>
    </section>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ ciudad: String })
const apiKey = 'b221ee79be96d11caa33bea05c8901f2'

const dias = ref([])

watch(
    () => props.ciudad,
    async (ciudad) => {
        if (!ciudad) return

        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`

        try {
        const res = await fetch(url)
        const datos = await res.json()

        const agrupados = {}
        datos.list.forEach((item) => {
            const fecha = item.dt_txt.split(' ')[0]
            if (!agrupados[fecha] && item.dt_txt.includes('12:00:00')) {
            agrupados[fecha] = item
            }
        })

        dias.value = Object.keys(agrupados)
            .slice(0, 5)
            .map((fecha) => {
            const item = agrupados[fecha]
            const temp = Math.round(item.main.temp)
            const icon = item.weather[0].icon
            const desc = item.weather[0].description
            const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`
            const diaNombre = new Date(fecha).toLocaleDateString('es-ES', {
                weekday: 'short',
            })

            return `
                <img src="${iconUrl}" alt="${desc}" />
                <div>${diaNombre}</div>
                <div>${temp}°C</div>
            `
            })
        } catch (err) {
        console.error('Error obteniendo pronóstico:', err)
        }
    },
    { immediate: true }
)
</script>
