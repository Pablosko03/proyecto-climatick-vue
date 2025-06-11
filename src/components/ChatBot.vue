<!-- components/ChatBot.vue -->
<template>
    <div class="chat-window">
        <div class="chat-header">
        <span>ClimaBot</span>
        <Button class="close-button" @click="$emit('close')"  icon="pi pi-times" severity="primary" rounded />
    </div>
        
        <div class="chat-body">
        
        <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.sender]">
        <img
            class="avatar"
            :src="msg.sender === 'user' ? userAvatar : botAvatar"
            :alt="msg.sender"
        />
        <p class="message-text">{{ msg.text }}</p>
        </div>
        </div>

        <div class="chat-input">
        <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Escribe tu mensaje..." />
        <button @click="sendMessage">Enviar</button>
        </div>
    </div>
</template>

<script>
import { Button } from 'primevue'

export default {
    data() {
        return {
            userInput: '',
            messages: [],
            botAvatar: 'https://img.freepik.com/vector-gratis/chatbot-mensaje-chat-vectorart_78370-4104.jpg?semt=ais_hybrid&w=740',
            userAvatar: 'https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg'
        }
    },

    components:{
        Button
    },

    mounted() {
        this.messages.push({
            sender: 'bot',
            text: '¡Hola! Soy ClimaBot. Dime el nombre de una ciudad o pueblo y te diré cómo está el clima.'
        })
    },
    methods: {
        async sendMessage() {
            const question = this.userInput.trim()
            if (!question) return

            // Añade el mensaje del usuario
            this.messages.push({ sender: 'user', text: question })
            this.userInput = ''

            try {
                const response = await fetch('https://cloud.flowiseai.com/api/v1/prediction/89571276-fb91-44e9-9488-f22b3beef8e2', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ question })
                })

                const data = await response.json()
                this.messages.push({ sender: 'ClimaBot', text: data.text || 'Sin respuesta.' })
            } catch (error) {
                this.messages.push({ sender: 'ClimaBot', text: 'Error al conectar con el bot.' })
                console.error(error)
            }
        }
    }
}


</script>

<style scoped>
.chat-window {
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
}

.chat-header {
    border-bottom: solid 2px #2128bd;
    color: #2b2b2b;
    border-radius: 12px 12px 0 0;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    font-family:Roboto, sans-serif;
    font-size: 18px;
}

.chat-body {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
}

.user {
    text-align: right;
    margin-bottom: 5px;
}

.bot {
    text-align: left;
    margin-bottom: 5px;
    font-family: Roboto, sans-serif;
    font-size: 15px;
    font-weight: 400;
    
}

.chat-input {
    display: flex;
    border-top: 1px solid #ccc;
}

.chat-input input {
    flex: 1;
    padding: 9px;
    padding-left: 1rem;
    border: none;
    outline: none;
    font-family: Roboto, sans-serif;
}

.chat-input button {
    padding: 10px;
    background: #2128bd;
    color: white;
    border: none;
    cursor: pointer;
    font-family: Roboto, sans-serif;
    font-size: 15px;
    font-weight: 400;

    &:hover {
        background: #868cf9;
    }
}
.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin: 0 8px;
}
.message {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
    
}

.close-button{
    background: #2128bd;
    color: white;
    cursor: pointer;
    border: none !important;
}

.close-button:hover {
    background: #868cf9 !important;
}
</style>
