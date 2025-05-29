<script>
import {auth} from '@/firebase/config'
import { onAuthStateChanged,signInWithEmailAndPassword } from "firebase/auth";
    export default {
        data() {
            return {
                email : '',
                password : '',
                message : ''
            }
        },
        methods : {
            login(){
                signInWithEmailAndPassword(auth, this.email, this.password)
                    .then((userCredential) => {
                        const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                this.message = errorMessage
            });
            }
        },
        mounted() {
            onAuthStateChanged(auth,(user) =>{
                if(user){
                    const uid = user.uid
                    this.message = 'Usuario logueado ' + user.email
                    localStorage.setItem('isLoggedIn', 'true');
                    this.$router.push('/');
                }else{
                    this.message = 'No hay usuario logueado'
                }
            })
        }
    }
</script>

<template>
    <div class="login">
        <h1>Iniciar Sesion</h1>
        <input v-model="email" type="email">
        <input v-model="password" type="password">
        <button @click="login">Entrar</button>
        <p>{{ message }}</p> 
    </div>
</template>

<style scoped>
.login {
    max-width: 400px;
    margin: 80px auto;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
}
.login input {
    display: block;
    width: 100%;
    margin: 0.5rem 0;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
}

</style>