<!-- src/components/Header.vue -->
<template>
    <header class="header">
        <RouterLink to="/"><h1 class="title">Climatik</h1></RouterLink>
        <nav class="nav">
            <button id="LogIn" v-if="!isLoggedIn" @click="$router.push('/login')">Iniciar sesión</button>
            <button id="Registro" v-if="!isLoggedIn" @click="$router.push('/register')">Registrarse</button>
            <button id="LogOut" v-if="isLoggedIn" @click="logout()">Logout</button>
        </nav>
    </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bungee+Tint&family=Nothing+You+Could+Do&display=swap');
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.nav{
    display: flex;
    gap: 1rem;
}
.title{
    font-family: "Roboto", sans-serif;
    font-size: 2rem;
    font-weight: 400;
    font-style: normal;
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

    data(){
        return {
            user: null,
            isLoggedIn : false
        }
    },
    
    mounted() {
        onAuthStateChanged(auth,(user) =>{
            this.isLoggedIn = !!user;
            if(user){
                this.user = user;
            }else{
                this.user = null;
            }
        })
    }
};
</script>
