<!-- components/Buscador.vue -->
<template>
    <div class="busqueda">
        <input
            v-model="ciudad"
            @input="sugerirCiudades"
            @keyup.enter="funcionEnter"
            type="text"
            placeholder="Buscar ciudad..."
        />
        <ul v-show="sugerencias.length" class="sugerencias">
            <li
                v-for="(s, i) in sugerencias"
                :key="i"
                @click="seleccionarCiudad(s.name)"
            >
                {{ s.name }}, {{ s.country }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['ciudadSeleccionada'])

const ciudad = ref('')
const sugerencias = ref([])
const apiKey = 'b221ee79be96d11caa33bea05c8901f2'

const sugerirCiudades = async () => {
    if (ciudad.value.trim().length < 3) {
        sugerencias.value = []
        return
    }

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${ciudad.value}&limit=5&appid=${apiKey}`

    try {
        const res = await fetch(url)
        const data = await res.json()
        sugerencias.value = data.filter((l) => l.country === 'ES')
    } catch (error) {
        console.error('Error al obtener sugerencias:', error)
    }
}

const seleccionarCiudad = (nombre) => {
    ciudad.value = nombre
    sugerencias.value = []
    emit('ciudadSeleccionada', nombre)
    }

    const funcionEnter = () => {
    sugerencias.value = []
    emit('ciudadSeleccionada', ciudad.value.trim())
}
</script>
