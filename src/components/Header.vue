<!-- src/components/Header.vue -->
<template>
    <header class="header">
        <RouterLink to="/"><h1 class="title">Climatik</h1></RouterLink>
        <nav class="nav">
            <button id="LogIn" @click="$router.push('/login')">Iniciar sesión</button>
            <button id="Registro" @click="$router.push('/register')">Registrarse</button>
            <button id="LogOut" @click="logout()">Logout</button>
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
            localStorage.setItem('isLoggedIn', 'false');
            this.updateUI();
        },

        updateUI() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

            document.getElementById('LogIn').style.display = isLoggedIn ? 'none' : 'inline-block';
            document.getElementById('Registro').style.display = isLoggedIn ? 'none' : 'inline-block';
            document.getElementById('LogOut').style.display = isLoggedIn ? 'inline-block' : 'none';
            window.onload = updateUI;
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
