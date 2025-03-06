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

function verificarHistoria() {
  
    router.push('/jugar/historia');
  
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

  <main id="main_menu">
    <div id="div_menu" v-if="visibleOpciones">
      <q-btn class="botones_menu" glossy label="Historia" @click="verificarHistoria"></q-btn>
      <br>
      <q-btn class="botones_menu" glossy label="Arcade" @click="verificarArcade"></q-btn>
      <br>
      <q-btn class="botones_menu" glossy label="Multijugador" @click="verificarMultijugador"></q-btn>
      <br>
      <RouterLink to="/" @click="ocultarTot">
        <q-btn class="botones_menu" glossy label="Volver"></q-btn>
      </RouterLink>
    </div>


  </main>
</template>

<style scoped>
#main_menu {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
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
  padding-top: 50px;
}

#div_menu {
  text-align: center;
  grid-column: 2;
  grid-row: 2;
}

.botones_menu {
  margin: 10px;
  width: 350px;
  font-size: 26px;
  border: 1px solid black;
  background-color: #ff4500;
  color: #ffffff;
  border: none;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.9);
  transition: transform 0.3s, background-color 0.3s;
}

.botones_menu:hover {
  background-color: #ffffff;
  color: #ff4500;
  transform: scale(1.05);
}

.botones_menu:active {
  transform: scale(1);
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
