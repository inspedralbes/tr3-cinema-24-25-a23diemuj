<script setup>
import { ref, reactive, onUnmounted,onMounted } from 'vue';
import Ranking from '../../components/ranking.vue';
import Partida from '../../components/Partida_basket.vue';
import Temporizador from '../../components/temporizador.vue';
import { getPreguntas } from '@/comunication_manager';
import { useCounterStore } from '@/stores/counter';

// const data = reactive({ pregunta: "" });
const data = reactive({ pregunta: [
  {
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
  },{
    "id": 1,
    "operacion": "5 + 3",
    "respuesta_correcta": 8,
    "respuestaIncorrecta_1": 9,
    "respuestaIncorrecta_2": 7,
    "respuestaIncorrecta_3": 10,
    "nivel": 1,
    "duracion": 7
  }
] });
const visibleJuego = ref(false);
const index = ref(0);
const puntuacion = ref(0);
const cargando = ref(true);
const mostrarTempo = ref(false); 
const name = ref("");
const visibleName = ref(true);
onMounted(() => {
      const useApp = useCounterStore();
      if (useApp.ActivarMusica==true) {
        useApp.ApagarMusica();
        
      }
    });

async function rellenarPreguntas() {

  if(name.value=="sexoooooo"){
  
  data.pregunta = await getPreguntas(0);
 
  }
  cargando.value = true; 
  visibleJuego.value = true;
  cargando.value = false;
 
}

function jugar() {
  useCounterStore().loginInfo.username=name.value;
  visibleName.value=false;
  mostrarTempo.value=true;
}
function siguientePregunta2(info) {

}
function siguientePregunta(info) {

/*
  if (info.fallo) {
    visibleJuego.value = false;
  } else {
    index.value++;
    if (index.value > 19) {
      rellenarPreguntas();
      index.value = 0;
    }
    puntuacion.value += info.canasta;
  }*/
  index.value++;
    if (index.value > 2) {
      index.value = 0;
    }

}

function ocultarTemporizador() {
  mostrarTempo.value = false;
  rellenarPreguntas();  
   
}
</script>

<template>
        
  <main class="main">
 
    <RouterLink to="/jugar">
    <img style="right: inherit;" src="@/assets/imagenes/volver.png" alt="Volver" class="imagen_volver">
  </RouterLink>
    <div v-if="visibleName" class="menu-mult"> 
      <div class="boton-grid">
        <div >
          <input type="text" v-model="name" class="input-sala" placeholder="Username" /><br><br>
        <q-btn @click="jugar" class="boton-sp" glossy label="Jugar "></q-btn>
      </div>
    </div>
      
    </div>
 



    <Temporizador v-if="mostrarTempo" @complete="ocultarTemporizador" />

    <Partida v-if="!cargando && visibleJuego && !mostrarTempo" :data="data.pregunta[index]" @siguiente="siguientePregunta" />
    <Ranking v-if="!cargando && !visibleJuego" :puntuacion="puntuacion" />
  </main>
</template>

<style scoped> 

.main {
  background-image: url("@/assets/bioma/beisbol.png");
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
