<script setup>
import { ref, reactive, onBeforeUnmount, onMounted } from 'vue';

const deporte=ref(0);

import Eleccion_modos from '@/components/recursos/eleccion_modos.vue'; 
import Multijugador_basquet from '@/components/multijugador/multijugador_basquet.vue';
import Multijugador_futbol from '@/components/multijugador/multijugador_futbol.vue';
import Multijugador_beisbol from '@/components/multijugador/multijugador_beisbol.vue';
import Multijugador_tenis from '@/components/multijugador/multijugador_tenis.vue';



  function modo(data){
    
  deporte.value=data;


}

  
const visibleBoton = ref(false);

 

</script>

<template>
 
  <main class="main" >
    <Eleccion_modos :new="activos" @deporte="modo"/>
    <Multijugador_beisbol v-if="deporte==1"/>
    <Multijugador_basquet v-if="deporte==2"/>
    <Multijugador_futbol v-if="deporte==3"/>
    <Multijugador_tenis v-if="deporte==4"/>

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