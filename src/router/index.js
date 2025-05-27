import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Clima from '@/views/Clima.vue'
import About from '@/views/About.vue'
import LogIn from '@/views/LogIn.vue'
import Register from '@/views/Register.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', 
      name: 'Home', 
      component: Home 
    },
    { path: '/clima', 
      name: 'Clima', 
      component: Clima 
    },
    { path: '/about', 
      name: 'About', 
      component: About 
    },
    { path: '/logIn', 
      name: 'LogIn', 
      component: LogIn 
    },
    { path: '/register', 
      name: 'Register', 
      component: Register 
    },
  ]
})

export default router