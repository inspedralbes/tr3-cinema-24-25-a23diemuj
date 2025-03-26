<script setup>
import { ref, reactive, onUnmounted,onMounted } from 'vue';
import Ranking from '../../components/ranking.vue';
import Partida_beisbol from '../../components/Partida_beisbol.vue';
import Partida_tenis from '../../components/Partida_tenis.vue';

import Temporizador from '../../components/temporizador.vue';
import { getPreguntas } from '@/comunication_manager';
import { useCounterStore } from '@/stores/counter';
import Partida_basquet from '../../components/Partida_basquet.vue';
import Eleccion_modos from '@/components/eleccion_modos.vue';
import Partida_futbol from '@/components/Partida_futbol.vue';
import Musica_juego from '@/components/musica_juego.vue';

const data = reactive({ pregunta: "" });
const visibleJuego = ref(false);
const index = ref(0);
const puntuacion = ref(0);
const cargando = ref(true);
const mostrarTempo = ref(false); 
const deporte=ref(0)
const name = ref("");
const visibleName = ref(false); 

 
async function rellenarPreguntas() {

  data.pregunta = await getPreguntas(0);
  cargando.value = true; 
  visibleJuego.value = true;
  cargando.value = false;
 
}

function modo(data){

  
  visibleName.value=true;
  deporte.value=data;


}


function jugar() {
  useCounterStore().loginInfo.username=name.value;
  useCounterStore().ApagarMusica();
  if(name.value.trim()==""){  
    useCounterStore().loginInfo.username="Invitado"
  }
  visibleName.value=false;
  rellenarPreguntas();  
  mostrarTempo.value=false;
}  
function siguientePregunta(info) {
  
   
  if (info.fallo) {
    visibleJuego.value = false;
  } else {
    index.value++;
    if (index.value > 19) {
      rellenarPreguntas();
      index.value = 0;
     
    }
     
    
  } 
  puntuacion.value = info.canasta;
 

  
    

}

function ocultarTemporizador() {
  mostrarTempo.value = false;
  rellenarPreguntas();  
   
}
</script>

<template>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=sports_baseball" />
 
  <main :style="{ backgroundImage: `url(/bioma/${deporte}.png)` }" class="main" >
    <Musica_juego v-if="!cargando && visibleJuego && !mostrarTempo"></Musica_juego>
    <RouterLink to="/jugar">
    <img style="right: inherit;" src="@/assets/imagenes/volver.png" alt="Volver" class="imagen_volver">
  </RouterLink>

 

  <Eleccion_modos @deporte="modo"/>



    <div v-if="visibleName" class="menu-mult"> 
      <div class="boton-grid">
        <div >
          <input type="text" v-model="name" class="input-sala" placeholder="Username" /><br><br>
        <q-btn @click="jugar" class="boton-sp" glossy label="Jugar "></q-btn>
      </div>
    </div>
      
    </div>
 



    <Temporizador v-if="mostrarTempo" @complete="ocultarTemporizador" />

    <Partida_beisbol v-if="!cargando && visibleJuego && !mostrarTempo && deporte==1" :data="data.pregunta[index]" @siguiente="siguientePregunta" />
    <Partida_basquet v-if="!cargando && visibleJuego && !mostrarTempo && deporte==2" :data="data.pregunta[index]" @siguiente="siguientePregunta" />
    <Partida_futbol v-if="!cargando && visibleJuego && !mostrarTempo && deporte==3" :data="data.pregunta[index]" @siguiente="siguientePregunta" />
    <Partida_tenis v-if="!cargando && visibleJuego && !mostrarTempo && deporte==4" :data="data.pregunta[index]" @siguiente="siguientePregunta" />
    
    <Ranking v-if="!cargando && !visibleJuego" :puntuacion="puntuacion" :deporte="deporte" />
  </main>
</template>

<style scoped> 

.main {
   
  background-position: center center;
  background-size: cover;
  background-attachment: fixed;
  height: 100vh;
  position: relative;
  padding-top: 20px;
  

}
 
  
.menu-mult {
  text-align: center;
 margin-top: 20%;
  font-size: 20px;
} 
.boton-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  justify-items: center;
  align-items: center;
  margin-top: 200px;
  font-family: 'Press Start 2P', cursive;
} 
.input-sala {
  width: 300px;
  max-width: 90%;
  padding: 10px;
  font-size: 16px;
  text-align: center;
  font-family: 'Press Start 2P', cursive;
} 
.boton-sp {
  width: 300px;
  max-width: 90%;
  font-size: 20px;
  background-color: #ff4500;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 20px 20px;
  font-family: 'Press Start 2P', cursive;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s, transform 0.2s;
}

.boton-sp:hover {
  background-color: #ffffff;
  color: #ff4500;
  transform: scale(1.1);
}

.boton-sp:active {
  transform: scale(1);
}


 
</style>
