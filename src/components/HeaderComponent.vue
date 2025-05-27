<template>
    <header class="header">
        <div class="header-content">
            <div class="menu-toggle" @click="$emit('toggle-menu')">
                ☰ Menú
            </div>

            <div class="auth-buttons">
                <button>Iniciar Sesión</button>
                <button>Registrarse</button>
            </div>
        </div>
    </header>
</template>

<script setup>
// Emitimos el evento al componente padre para que controle el toggle
</script>

<style scoped>
/* Estilos relacionados con el header */
</style>
