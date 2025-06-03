<!-- components/Pronostico.vue -->
<template>
    <section class="proximos-dias">
        <div class="dias">
            <button v-for="(dia, i) in dias" :key="i" v-html="dia"></button>
        </div>
        
        
    </section>
</template>
<style >

.dias {
    display: flex;
    flex-direction: column;
    gap: 9px;
}
.dias button {
    width: 40%;
    border-radius: 50px;
    height: 80px;
    font-size: 40px;
    display: flex;
    align-items: center;
    gap: 20px;
}
.dias button img {
    width: 90px;
    height: 90px;
    flex-shrink: 0;
}
@media (max-width: 800px) {
    .dias button {
    font-size: 16px;
    padding: 8px 12px;
    gap: 10px;
}

    .dias button img {
    width: 40px;
    height: 40px;
}
}
</style>
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
