<!-- src/components/Header.vue -->
<template>
    <header class="header">
    <div class = "left-header">
        <RouterLink to="/">
            <img class="logo" src="/img/climatik-white.png" alt="">
            <!-- <h1 class="title">Climatik</h1> -->
        </RouterLink>
        <h1 v-if="isLoggedIn" class="username">Hola {{ username }}</h1>
    </div>
        
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
.left-header {
    display: flex;
    align-items: center;
    gap: 1rem;
}
.username {
    font-size: 1.5rem;
    font-weight: 600;
    color: white;
    margin: 0;
}
</style>

<script>
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export default {
    name: 'Header',

    data() {
        return {
            user: null,
            isLoggedIn: false,
            username: ''
        };
    },

    methods: {
        async logout() {
            await signOut(auth);
            this.isLoggedIn = false;
            this.user = null;
            this.username = '';
            localStorage.removeItem('username');
        }
    },

    mounted() {
        onAuthStateChanged(auth, async (user) => {
            this.isLoggedIn = !!user;

            if (user) {
                this.user = user;
                console.log('usuario ha iniciado sesion')
                
                const storedName = localStorage.getItem('username');
                console.log('storedName', storedName)
                if (storedName) {
                    this.username = storedName;
                    console.log('primer if')
                } else {
                    
                    try {
                        const userDoc = await getDoc(doc(db, 'users', user.uid));
                        if (userDoc.exists()) {
                            const name = userDoc.data().name;
                            this.username = name;
                            localStorage.setItem('username', name);
                            console.error('if');
                        }
                    } catch (error) {
                        console.error('Error obteniendo el nombre:', error);
                    }
                }

            } else {
                this.user = null;
                this.username = '';
            }
        });
    }
};
</script>
