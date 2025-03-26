<script setup>
import { ref, watch,onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { useQuasar, QSpinnerFacebook } from 'quasar';
import { onBeforeUnmount } from 'vue';

import socketManager from '@/socket';
import musica from '@/components/musica.vue';


onMounted(() => {

socketManager.RemSocket();
  const useApp = useCounterStore();
  
      if (useApp.ActivarMusica==false) {
        useApp.EncenderMusica();
        
      }
     
    });

  

const $q = useQuasar();
const router = useRouter();

const visibleLog = ref(false);
const useApp = useCounterStore();
const visibleOpciones = ref(true); 

function ocultarTot() {
  visibleOpciones.value = false;
}

function salir() {
  
    router.push('/');
  
}

function verificarMultijugador() {

    router.push('/jugar/multijugador');
   
}

function verificarArcade() {
  
    router.push('/jugar/arcade');
  
}

const route = useRoute();

watch(route, (newRoute) => {
  if (newRoute.path === '/jugar') {
    visibleOpciones.value = true;
    socketManager.RemSocket();
  }
});

if (useApp.loginInfo.loggedIn) {
  visibleLog.value = true;
} else {
  visibleLog.value = false;
}
</script>
<template>
  <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  
  <main id="main_menu">

    <div id="div_menu" v-if="visibleOpciones">
      <q-btn class="botones_menu boton_single" glossy label="" @click="verificarArcade">   <span class="texto_menu">1</span>  </q-btn>
       
      <q-btn class="botones_menu boton_multi" glossy label=""@click="verificarMultijugador" > <span class="texto_menu_multi">2+</span>  </q-btn>
      <q-btn class="botones_atras" glossy label=""  @click="salir"><span style="font-size: 60px;" class="material-icons"> keyboard_return </span>   </q-btn>           
     
    </div>
    
   
  </main>
</template>

<style scoped>


#main_menu {
  display: flex;
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
  height: 100vh;
  font-family: 'Press Start 2P', cursive;
}
 

.menu_avatar {
  text-align: center;
}

.enlaces {
  text-decoration: none;
  color: inherit;
}

.div_user {
  height: 400px;
  width: 300px;
  font-family: 'Press Start 2P', cursive;
  
}

#div_menu {
  text-align: center;
  width: 200px;
  grid-column: 2;
  grid-row: 2;
  gap: 20px; /* Elimina cualquier separación entre botones */
  justify-content: center;
  align-items: center;
   
}
.texto_menu {
position: absolute;
top: 0;
left: 0;
margin-top: 70px;
margin-left: 60px;
font-size: 50px;
}
.texto_menu_multi {
position: absolute;
right: 0;
bottom: 0;
margin-bottom: 70px;
margin-right: 30px;
font-size: 50px;
}
.botones_menu {
  position: absolute;
  width: 300px;
  height: 300px; 
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  display: inline;
  font-size: 26px;
  border: 1px solid black;
  background-color: black;
  color: #ffffff;
  border: none;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
  transition: transform 0.3s, background-color 0.3s;
   
 border-radius: 20px;
}

.botones_atras {
  position: absolute;
  width: 310px;
  height: 100px; 
  top:50%;
  left:50%;
  margin-top: 210px;
  transform: translate(-50%, -50%);
  display: inline;
  font-size: 26px;
  border: 1px solid black;
  background-color: black;
  color: #ffffff;
 border-radius: 20px;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
  transition: transform 0.3s, background-color 0.3s;
   
}

.boton_single{
 
  clip-path: polygon(0% 0%, 100% 0%, 0% 100%);
  
}

.boton_multi{
  margin-left: 10px;
  clip-path: polygon(100% 0%, 100% 100%, 0% 100%);

}
.botones_menu:hover {
  background-color: #ffffff;
  color: #000000;
  
}
 

.botones_desple {
  margin-top: 10px;
  width: 250px;
  font-size: 5px;
}

.user_menu {
  height: 20%;
  margin-top: 80px; /* Aumenta el margen superior */
  grid-column: 2;
  grid-row: 3;
  align-self: center;
  justify-self: right;
}

</style>
