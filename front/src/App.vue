<script setup>
import { RouterLink, RouterView } from 'vue-router'
import musica from './components/musica.vue';
</script>

<template>
  <musica class="a021"></musica>
 <RouterView />
  
</template>

<style>

.a021{
position: absolute;
right: 0; 
margin-right: 20px;
}

.imagen_volver {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 40px;
  border: 2px solid white;
  border-radius: 5px;
}
</style>
