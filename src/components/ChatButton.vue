<template>

<div class="chat-container">
    <button @click="toggle" class="chat-toggle-btn">
    💬
    </button>
    
</div>

<Popover ref="op">
    <ChatBot @close="showChat = false" />
</Popover>
</template>

<script>
import ChatBot from './ChatBot.vue'
import Popover from 'primevue/popover';


export default {
    components: {
        ChatBot,
        Popover
    },
    data() {
        return {
            showChat: false
        }
    },
    methods: {
        toggleChat() {
            this.showChat = !this.showChat
        },
        toggle(event) {
            this.$refs.op.toggle(event);
        }
    }
    
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