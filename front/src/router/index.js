import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/inicio.vue'
import Menu from '../views/menu.vue' 
import arcade from '../views/modos/arcade.vue'
import multijugador from '../views/modos/multijugador.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Inicio,
    },
    {
      path: '/jugar/arcade', 
      name: 'arcade',
      component: arcade,
    },
     
    ,
    {
      path: '/jugar/multijugador',  
      name: 'multijugador',
      component: multijugador,
    },

    {
      path: '/jugar',
      name: 'jugar',
      component: Menu,
    },
    
  ],
})

export default router
