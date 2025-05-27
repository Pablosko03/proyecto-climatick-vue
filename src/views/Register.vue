<script>
import { auth, db } from '@/firebase/config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

    export default {
        data() {
            return {
                email : '',
                password : '',
                message : '',
                name: ''
            }
        },
        methods : {
            async register(){
                console.log(this.email, this.password)
                await createUserWithEmailAndPassword(auth,this.email, this.password)
                .then( async (userCredential)=> {
                    const user = userCredential.user;
                    this.message = 'Usuario registrado';
                    console.log("he pasado el registro");
                    console.log(user);
                    console.log(user.uid);
                    await setDoc(doc(db, "users", user.uid), {
                            name: this.name,
                        })
                        .then(() => {
                            console.log("Documento escrito correctamente");
                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });
                    console.log("he pasado el setDoc");

                    this.$router.push('/');
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    this.message = errorMessage
                })
            }
        }
    }
</script>

<template>
    <div>
        <h1>Registrarse</h1>
        <input v-model="name" type="text" placeholder="Nombre completo">
        <input v-model="email" type="email">
        <input v-model="password" type="password">
        <button @click="register">Registrarse</button>
    </div>
</template>