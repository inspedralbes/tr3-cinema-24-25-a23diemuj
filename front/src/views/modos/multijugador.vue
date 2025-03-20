<script setup>
import { ref, reactive, onBeforeUnmount, onMounted } from 'vue';

const deporte=ref(0);

import Eleccion_modos from '@/components/eleccion_modos.vue'; 
import Multijugador_basquet from '@/components/multijugador_basquet.vue';


  function modo(data){
    
  deporte.value=data;


}

 


const visibleBoton = ref(false);

 

</script>

<template>

  <div>
    

  </div>
  <main>
    <Eleccion_modos @deporte="modo"/>
    
    <Multijugador_basquet v-if="deporte==2"/>
 
     
   


  </main>



</template>


<style scoped>

</style>