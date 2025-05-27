<!-- components/ChatBot.vue -->
<template>
    <div class="chat-container">
        <button class="chat-toggle" @click="visible = true">💬</button>

        <div class="chat-box" v-show="visible">
        <header class="chat-header">
            <span>Asistente</span>
            <button @click="visible = false">✖</button>
        </header>

        <div class="chat-messages" ref="scrollArea">
            <div v-for="(msg, i) in mensajes" :key="i" :class="msg.rol">
            <strong>{{ msg.rol === 'user' ? 'Tú' : 'Bot' }}:</strong> {{ msg.texto }}
            </div>
        </div>

        <div class="chat-input">
            <input
            v-model="entrada"
            @keypress.enter="enviarMensaje"
            type="text"
            placeholder="Escribe algo..."
            />
            <button @click="enviarMensaje">Enviar</button>
        </div>
        </div>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const API_URL = 'https://cloud.flowiseai.com/api/v1/prediction/0668fda7-8cfa-4fa0-9748-5603d95f6132'

const entrada = ref('')
const mensajes = ref([])
const visible = ref(false)
const scrollArea = ref(null)

const enviarMensaje = async () => {
    const texto = entrada.value.trim()
    if (!texto) return

    mensajes.value.push({ rol: 'user', texto })
    entrada.value = ''

    try {
        const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: texto }),
        })
        const data = await res.json()
        const respuesta =
        typeof data === 'string'
            ? data
            : data.answer || data.response || JSON.stringify(data)

        mensajes.value.push({ rol: 'bot', texto: respuesta })
    } catch (error) {
        console.error(error)
        mensajes.value.push({ rol: 'bot', texto: 'Error al contactar con el bot.' })
    }

    await nextTick()
    if (scrollArea.value) {
        scrollArea.value.scrollTop = scrollArea.value.scrollHeight
    }
}
</script>

<style scoped>
.chat-container {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    font-family: sans-serif;
}
.chat-toggle {
    background: #2563eb;
    color: white;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 9999px;
    cursor: pointer;
}
.chat-box {
    width: 300px;
    height: 400px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.chat-header {
    background: #1e40af;
    color: white;
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}
.chat-messages {
    flex: 1;
    padding: 0.5rem;
    overflow-y: auto;
}
.chat-messages .user {
    text-align: right;
    margin: 0.5rem 0;
}
.chat-messages .bot {
    text-align: left;
    margin: 0.5rem 0;
}
.chat-input {
    display: flex;
    border-top: 1px solid #ccc;
}
.chat-input input {
    flex: 1;
    border: none;
    padding: 0.5rem;
}
.chat-input button {
    background: #2563eb;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
}
</style>
