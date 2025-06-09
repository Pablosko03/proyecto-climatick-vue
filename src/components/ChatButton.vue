<template>
<div class="chat-container">
    <button @click="toggleChat" class="chat-toggle-btn">
    💬
    </button>
    <ChatBot v-if="showChat" @close="showChat = false" />
</div>
</template>

<script setup>
import { ref } from 'vue'
import ChatBot from './ChatBot.vue'

const showChat = ref(false)

function toggleChat() {
    showChat.value = !showChat.value
}
</script>

<style scoped>
.chat-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
}

.chat-toggle-btn {
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>