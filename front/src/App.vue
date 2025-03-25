<script setup>
import { RouterLink, RouterView } from 'vue-router'
import musica from './components/musica.vue';
import { useCounterStore } from './stores/counter';
 


const useApp = useCounterStore();
</script>

<template>
 <musica v-if="useApp.ActivarMusica"/>
 <RouterView />
  
</template>

<style>



.imagen_volver {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 40px;
  border: 2px solid white;
  border-radius: 5px;
}
</style>
