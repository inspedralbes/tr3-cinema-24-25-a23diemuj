<script setup>
import { RouterLink, RouterView } from 'vue-router'
import musica from './components/musica/musica.vue';
import { useCounterStore } from './stores/counter';
 


const useApp = useCounterStore();
</script>

<template>
 <musica v-if="useApp.ActivarMusica"/>
 <RouterView />
  
</template>

<style>

 
</style>
