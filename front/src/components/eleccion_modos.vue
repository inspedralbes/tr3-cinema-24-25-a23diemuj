<template>
<main>
    <div v-if="visibleModos">
    <div id="div_menu">
      <q-btn class="botones_menu" glossy  @click="modo(1)"  > <span style="font-size: 60px;" class="material-icons">sports_baseball</span>  </q-btn>
      <br>
      <q-btn class="botones_menu" glossy @click="modo(2)"  > 
        <span style="font-size: 60px;" class="material-icons" >sports_basketball</span>  </q-btn>
      <br>
      <q-btn class="botones_menu" glossy disable  @click="modo(3)"   > <span style="font-size: 60px;" class="material-icons">sports_soccer</span></q-btn>
      <br>
      <q-btn class="botones_menu" glossy  disable  @click="modo(4)" > <span style="font-size: 60px;" class="material-icons">sports_tennis</span></q-btn>
        <br>
      
      <RouterLink to="/" @click="ocultarTot">
        <q-btn class="botones_menu" glossy label="Volver"></q-btn>
      </RouterLink>
    </div>

    </div>
</main>

</template>
<script setup>
import { ref } from 'vue';




const visibleModos = ref(true);


const emit = defineEmits();


function modo(deporte) {
    emit('deporte',deporte); 
    visibleModos.value=false;

}

</script>

<style scoped>

#div_menu {

text-align: center;
margin-top: 10%;

}

.botones_menu {
margin: 10px;
width: 200px;
font-size: 26px;
border: 1px solid black;
background-color: #000000;
color: #ffffff;
border-radius: 20%;
cursor: pointer;
box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
transition: transform 0.3s, background-color 0.3s;
}
.botones_menu:hover {
background-color: #ffffff;
color: #000000;
transform: scale(1.05);
}
</style>