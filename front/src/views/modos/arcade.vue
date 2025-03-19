<script setup>
import { ref, reactive, onUnmounted,onMounted } from 'vue';
import Ranking from '../../components/ranking.vue';
import Partida_beisbol from '../../components/Partida_beisbol.vue';
import Partida_tenis from '../../components/Partida_tenis.vue';

import Temporizador from '../../components/temporizador.vue';
import { getPreguntas } from '@/comunication_manager';
import { useCounterStore } from '@/stores/counter';
import Partida_basquet from '../../components/Partida_basquet.vue';

const data = reactive({ pregunta: "" });

/*
const data = reactive({ pregunta: [
  {
    "id": 1,
    "operacion": "5 + 1",
    "respuesta_correcta": 8,
    "respuestaIncorrecta_1": 9,
    "respuestaIncorrecta_2": 7,
    "respuestaIncorrecta_3": 10,
    "nivel": 1,
    "duracion": 7
  },{
    "id": 1,
    "operacion": "5 + 2",
    "respuesta_correcta": 8,
    "respuestaIncorrecta_1": 9,
    "respuestaIncorrecta_2": 7,
    "respuestaIncorrecta_3": 10,
    "nivel": 1,
    "duracion": 7
  },{
    "id": 1,
    "operacion": "5 + 3",
    "respuesta_correcta": 8,
    "respuestaIncorrecta_1": 9,
    "respuestaIncorrecta_2": 7,
    "respuestaIncorrecta_3": 10,
    "nivel": 1,
    "duracion": 7
  },{
    "id": 1,
    "operacion": "5 + 4",
    "respuesta_correcta": 8,
    "respuestaIncorrecta_1": 9,
    "respuestaIncorrecta_2": 7,
    "respuestaIncorrecta_3": 10,
    "nivel": 1,
    "duracion": 7
  }
] }); */
const visibleJuego = ref(false);
const index = ref(0);
const puntuacion = ref(0);
const cargando = ref(true);
const mostrarTempo = ref(false); 
const deporte=ref(0)
const name = ref("");
const visibleName = ref(false);
const visibleModos = ref(true);
onMounted(() => {
      const useApp = useCounterStore();
      if (useApp.ActivarMusica==true) {
        useApp.ApagarMusica();
        
      }
    });

async function rellenarPreguntas() {

  data.pregunta = await getPreguntas(0);
  cargando.value = true; 
  visibleJuego.value = true;
  cargando.value = false;
 
}

function modo(data){
  visibleModos.value=false;
  visibleName.value=true;
  deporte.value=data;


}


function jugar() {
  useCounterStore().loginInfo.username=name.value;
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
    console.log(index.value)
    
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
 
    <RouterLink to="/jugar">
    <img style="right: inherit;" src="@/assets/imagenes/volver.png" alt="Volver" class="imagen_volver">
  </RouterLink>

  <div v-if="visibleModos">
    <div id="div_menu">
      <q-btn class="botones_menu" glossy  > <span style="font-size: 60px;" class="material-icons" @click="modo(1)">sports_baseball</span>  </q-btn>
      <br>
      <q-btn class="botones_menu" glossy  > 
        <span style="font-size: 60px;" class="material-icons" @click="modo(2)">sports_basketball</span>  </q-btn>
      <br>
      <q-btn class="botones_menu" glossy disable  > <span style="font-size: 60px;" class="material-icons" @click="modo(3)" >sports_soccer</span></q-btn>
      <br>
      <q-btn class="botones_menu" glossy  disable > <span style="font-size: 60px;" class="material-icons" @click="modo(4)">sports_tennis</span></q-btn>
        <br>
      
      <RouterLink to="/" @click="ocultarTot">
        <q-btn class="botones_menu" glossy label="Volver"></q-btn>
      </RouterLink>
    </div>

  
  
  
  </div>





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
    <Partida_tenis v-if="!cargando && visibleJuego && !mostrarTempo && deporte==4" :data="data.pregunta[index]" @siguiente="siguientePregunta" />
   
    <Ranking v-if="!cargando && !visibleJuego" :puntuacion="puntuacion" />
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
