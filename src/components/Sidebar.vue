<template>
    <div class="sidebar" id="menuLateral">
        <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Pronóstico</a></li>
            <li><a href="#">Favoritos</a></li>
            <li><a href="#">Configuración</a></li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    isActive: Boolean
})
</script>