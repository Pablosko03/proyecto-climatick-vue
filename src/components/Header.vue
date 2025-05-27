<!-- src/components/Header.vue -->
<template>
    <header class="header">
        <h1>Climatik</h1>
        <nav>
            <button v-if="!user" id="LogIn" @click="$router.push('/login')">Iniciar sesión</button>
            <button v-if="!user" id="Registro" @click="$router.push('/register')">Registrarse</button>
            <button v-if="user" id="LogOut" @click="logout">Logout</button>
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
        }
    },
    
    mounted() {
        onAuthStateChanged(auth,(user) =>{
            if(user){
                this.user = user;
            }else{
                this.user = null;
            }
        })
    }
};
</script>
