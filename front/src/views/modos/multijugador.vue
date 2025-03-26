<script setup>
import { ref, reactive, onBeforeUnmount, onMounted } from 'vue';

const deporte=ref(0);

import Eleccion_modos from '@/components/eleccion_modos.vue'; 
import Multijugador_basquet from '@/components/multijugador_basquet.vue';
import Multijugador_futbol from '@/components/multijugador_futbol.vue';



  function modo(data){
    
  deporte.value=data;


}

  
const visibleBoton = ref(false);

 

</script>

<template>
 
  <main class="main" >
    <Eleccion_modos :new="activos" @deporte="modo"/>
    <Multijugador_basquet v-if="deporte==2"/>
    <Multijugador_futbol v-if="deporte==3"/>
  

  </main>



</template>


<style scoped>
.main {
   background-image: url("/bioma/0.png");
   background-position: center center;
   background-size: cover;
   background-attachment: fixed;
   height: 100vh;
   position: relative;
   padding-top: 20px;
   
 
 }



</style>