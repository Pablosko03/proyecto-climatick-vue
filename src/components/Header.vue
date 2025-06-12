<!-- src/components/Header.vue -->
<template>
    <header class="header">
        <RouterLink to="/">
            <img class="logo" src="/img/climatik-white.png" alt="">
            <!-- <h1 class="title">Climatik</h1> -->
        </RouterLink>
        <nav class="nav">
            <button id="LogIn" v-if="!isLoggedIn" @click="$router.push('/login')">Iniciar sesión</button>
            <button id="Registro" v-if="!isLoggedIn" @click="$router.push('/register')">Registrarse</button>
            <button id="LogOut" v-if="isLoggedIn" @click="logout()">Logout</button>
        </nav>
    </header>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap");

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav {
    display: flex;
    gap: 1rem;
}

.logo{
    width: 100px;
    height: auto;
}

</style>

<script>
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';

export default {
    name: 'Header',
    mounted() {

    },
    methods: {

        async logout() {
            await signOut(auth);
            
        },

        
    },

    data() {
        return {
            user: null,
            isLoggedIn : false
        }
    },

    mounted() {
        onAuthStateChanged(auth,(user) =>{
            if(user){
                this.user = user;
            } else {
                this.user = null;
            }
        })
    }
};
</script>
