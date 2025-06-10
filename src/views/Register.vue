<script>
import { auth, db } from '@/firebase/config'
import { onAuthStateChanged, createUserWithEmailAndPassword } from "firebase/auth";
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
                })
                .catch((error) => {
                    const errorCode = error.code
                    const errorMessage = error.message
                    this.message = errorMessage
                })
            },
            
            updateUI() {
                const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

                document.getElementById('LogIn').style.display = isLoggedIn ? 'none' : 'inline-block';
                document.getElementById('Registro').style.display = isLoggedIn ? 'none' : 'inline-block';
                document.getElementById('LogOut').style.display = isLoggedIn ? 'inline-block' : 'none';
                window.onload = updateUI;
            },
        },
        mounted() {
            onAuthStateChanged(auth,(user) =>{
                if(user){
                    const uid = user.uid
                    this.message = 'Usuario logueado ' + user.email
                    localStorage.setItem('isLoggedIn', 'true');
                    this.$router.push('/');
                    this.updateUI();
                }else{
                    this.message = 'No hay usuario logueado'
                }
            })
        }
    }
</script>

<template>
    <div class="register-container">
    <div class="register">
        <h1>Hazte miembro!</h1>
        <p class="slogan"><span>Climatik</span> el clima a un <span>click</span></p>
        <input v-model="name" type="text" placeholder="Nombre completo">
        <input v-model="email" type="email" placeholder="Email">
        <input v-model="password" type="password" placeholder="Contraseña">
        <button class="button" @click="register">Registrarse</button>
    </div>

    <div class="img-container">
    <div class="img-login">
        <img src="/public/img/register.webp" alt="">
        <p class="advantage">¡Disfruta de las ventajas de registrarse!</p>
    </div>
    </div>
    </div>
</template>

<style scoped>
.register-container{
    display: flex;
    justify-content: column;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff83;

    & h1{
            font-family: "Bricolage Grotesque", sans-serif;
            font-size: 35px;
            color:#2c2c2c
    }

    & p.slogan {
        font-family: "Bricolage Grotesque", sans-serif;
        font-size: 20px;
        color:#2c2c2c;
        padding: 1.5rem 0 2rem 0;

        & span {
            font-family: "Bricolage Grotesque", sans-serif;
            color: #2128bd;
            font-size: 23px;
            font-weight: 800;
        }
    }

    & p {
        font-family: Roboto, sans-serif;
        font-size: 18px;
        color: #2c2c2c;
        padding: 1.5rem 0 2rem 0;
    }
    }
    

.register{
   width: 500px;
    margin: 80px auto;
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    background: #fff
}
.register input {
    color:#2c2c2c;
    display: block;
    width: 100%;
    margin: 0.5rem 0;
    padding: 0.75rem;
    font-size: 1rem;
    border: 3px solid #2128bd;
    border-radius: 25px;
    box-sizing: border-box;
}

.img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    height: 100vh;
    background-color: #868cf9b6;
}

.img-login {
    height: 600px;
    width: 600px;    
    border-radius: 25px;
    display: flex;
    justify-content: center;


    & img {
        width: 500px;
        height: 500px;
        object-fit: cover;
        padding-top: 2rem;

    }

    & p.advantage {
        font-family: "Bricolage Grotesque", sans-serif;
        font-size: 20px;
        font-weight: 600;
        color: #2c2c2c;
        text-align: center;
        position: absolute;
        top: 90%;
        right: 13%;
        padding-top: 3rem;
    }
}

.button {
    background-color: #2128bd;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
}


</style>