<!-- src/components/Header.vue -->
<template>
    <header class="header">
        <h1>Climatik</h1>
        <nav>
            <button id="LogIn" @click="$router.push('/login')">Iniciar sesión</button>
            <button id="Registro" @click="$router.push('/register')">Registrarse</button>
            <button id="LogOut" @click="logout">Logout</button>
        </nav>
    </header>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>

<script>

export default {
    name: 'Header',
    mounted() {

    },
    methods: {
            
        logout() {
            localStorage.removeItem('isLoggedIn');
            updateUI();
        },

        updateUI() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

            document.getElementById('LogIn').style.display = isLoggedIn ? 'none' : 'inline-block';
            document.getElementById('Registro').style.display = isLoggedIn ? 'none' : 'inline-block';
            document.getElementById('LogOut').style.display = isLoggedIn ? 'inline-block' : 'none';
            window.onload = updateUI;
        },
    },
};
</script>
