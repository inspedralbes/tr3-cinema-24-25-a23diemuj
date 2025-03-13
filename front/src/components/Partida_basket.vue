<script setup>
import { reactive, ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { useCounterStore } from '@/stores/counter';


const props = defineProps({
  data: {
    type: Object,
    required: true,
  },




},)
/*
const props={data:  {
    "id": 1,
    "operacion": "5 + 3",
    "respuesta_correcta": 8,
    "respuestaIncorrecta_1": 9,
    "respuestaIncorrecta_2": 7,
    "respuestaIncorrecta_3": 10,
    "nivel": 1,
    "duracion": 24
  }};

*/
const Canastas = ref(0)
const valorCanasta = ref(0)
const index = ref(0);
const Zindex = reactive({ balon: 0, bate: 1 });
const info = reactive({ fallo: false, canasta: 0, racha: false })
const bases = reactive([false, false, false, false]);
const animaciones = reactive({
  encestar: false, bateo1: false, bateo2: false, bateo3: false,
  tiro: true, bate: false, disolver: false

})


function apagarAnimaciones(interrumptor) {


  animaciones.bateo1 = false;
  animaciones.bateo2 = false;
  animaciones.bateo3 = false;
  animaciones.bate = false;


}

function reiniciarInfo() {

  info.canasta = 0;
  info.fallo = false;
  info.racha = false;
}


let puntosSeguidos = 0;


function moverBase(num) {

  setTimeout(() => {
    bases[num] = true;
  }, 100);
}


function comprobarBase(num) {
  let carreras = 0;



  switch (num) {

    case 1:
      if (bases[2]) {
        bases[2] = false;
        carreras++;
      }
      if (bases[1]) {
        bases[1] = false;
        moverBase(2)
      }
      if (bases[0]) {
        bases[0] = false;
        moverBase(1);

      }

      moverBase(0);

      break;
    case 2:


      /* 
        if(bases[2]){
          bases[2]=false;
          carreras++;
        }
       
        if(bases[1]){
          carreras++;
        }
       
  
  
  
       if(bases[0]){
       bases[0]=false;
       moverBase(1);
       setTimeout(() => {
        bases[1]=false;
      }, 600);
     
      setTimeout(() => {
        moverBase(2)
      }, 500);
  
  
        }
      
  
        // home to 2nd
        moverBase(0)
      setTimeout(() => {
        bases[0]=false;
      }, 600);
     
      setTimeout(() => {
        moverBase(1)
      }, 500);
      */


      if (bases[2]) {
        bases[2] = false;
        carreras++;
      } else {
        if (bases[1]) {
         bases[1]=false;
          moverBase(0);
            setTimeout(() => {
              bases[0] = false;

            }, 600);
            setTimeout(() => {
              moverBase(1);
            }, 500);

        } else {
          if (bases[0]) {

            setTimeout(() => {
              bases[0] = false;

            }, 100);

            moverBase(0);
            moverBase(1);


            setTimeout(() => {
              bases[0] = false;
              bases[1] = false;

            }, 600);
            setTimeout(() => {
              moverBase(1);
              moverBase(2);
            }, 500);

          }else{

            moverBase(0);
            setTimeout(() => {
              bases[0] = false;

            }, 600);
            setTimeout(() => {
              moverBase(1);
            }, 500);

          }
        }
      }




      break;
    case 3:
      for (let index = 0; index < num; index++) {
        if (bases[index]) {
          bases[index] = false;
          carreras++;
        }

      }


      // home to 1st
      moverBase(0)


      // 1st to 2nd
      setTimeout(() => {
        bases[0] = false;
      }, 600);


      setTimeout(() => {
        moverBase(1)
      }, 500);


      // 2nd to 3rd
      setTimeout(() => {
        bases[1] = false;
      }, 1100);



      setTimeout(() => {
        moverBase(2)
      }, 1000);

      break;
    case 4:
      moverBase(3)
      break;


  }

  console.log(carreras)
  console.log(num)

}


function comprobarPunto(num) {

  reiniciarInfo();

  let apagar = 0;
  animaciones.bate = true;
  if (props.data.respuesta_correcta == num) {


    if (progress.value < 0.2) {
      puntosSeguidos++;
      info.canasta = 4;
    } else if (progress.value < 0.5) {
      info.canasta = 3;
      puntosSeguidos = 0;

    } else if (progress.value < 0.8) {
      info.canasta = 2;
      puntosSeguidos = 0;

    } else if (progress.value < 1) {
      info.canasta = 1;
      puntosSeguidos = 0;
    } else { }


    if (puntosSeguidos == 3) {

      apagar = 3;

    }
    if (puntosSeguidos == 4) {
      apagar = 4;
    }
    if (puntosSeguidos >= 5) {
      apagar = 5
      info.racha = true;
      animaciones.encestar = true;
      tiroHecho.value = true;

    }
    else {
      let aux = Math.floor(Math.random() * 3) + 1;


      if (props.data.duracion >= 0 && props.data.duracion <= 2) {

        setTimeout(() => {
          animaciones.tiro = false;
          animaciones[`bateo2`] = true;


        }, 500);
      }

      if (props.data.duracion >= 3 && props.data.duracion <= 4) {

        setTimeout(() => {
          animaciones.tiro = false;
          animaciones[`bateo3`] = true;


        }, 500);
      }



      if (props.data.duracion >= 5 && props.data.duracion <= 7) {

        setTimeout(() => {
          animaciones.tiro = false;
          // animaciones[`bateo${aux}`] = true; 
          animaciones[`bateo1`] = true;

        }, 500);
      }

      tiroHecho.value = true;



    }

  } else {
    console.log("hola")
    tiroHecho.value = true;
    info.fallo = true;
    info.canasta = 0;
    puntosSeguidos = 0;





  }

  index.value++;

  setTimeout(() => {
    apagarAnimaciones(apagar);
    tiroHecho.value = false;



  }, 1000);


}



const progress = ref(0.0);
const color = ref('');
const aux = ref(0);
let idTemporizador = null;
reiniciarTemporizador();
watch(() => props.data, () => {
  reiniciarTemporizador();
});

function reiniciarTemporizador() {

  if (idTemporizador) {
    clearInterval(idTemporizador);
  }

  progress.value = 0.0;
  color.value = '';

  aux.value = 1 / 7;
  props.data.duracion = 7;
  iniciarTemporizador();
}

function iniciarTemporizador() {
  idTemporizador = setInterval(() => {

    progress.value = progress.value + aux.value;
    props.data.duracion--;

    if (progress.value > 0 && progress.value < 0.2) {
      color.value = 'yellow';
    } else if (progress.value > 0.2 && progress.value < 0.4) {
      color.value = 'blue';
    } else if (progress.value > 0.5 && progress.value < 0.7) {
      color.value = 'green';
    } else if (progress.value > 0.8 && progress.value < 0.9) {
      color.value = 'red';
    } else if (progress.value > 1) {

      clearInterval(idTemporizador);
      responder(-1);

    }


  }, 1000);
}




const emit = defineEmits();

const tiroHecho = ref(false);

function mezclarRespuestas() {
  const respuestas = [
    props.data.respuesta_correcta,
    props.data.respuestaIncorrecta_1,
    props.data.respuestaIncorrecta_2,
    props.data.respuestaIncorrecta_3
  ];
  return respuestas.sort(() => Math.random() - 0.5);


}

const respuestasMezcladas = computed(() => mezclarRespuestas());

function responder(num) {


  comprobarPunto(num);

  setTimeout(() => {
    animaciones.tiro = false;


  }, 500);

  if (info.fallo) {
    Zindex.balon = 1;
    Zindex.bate = 0;

    setTimeout(() => {
      animaciones.tiro = true
      emit('siguiente', info);
      Zindex.balon = 0;
      Zindex.bate = 1;

    }, 600);
  } else {

    setTimeout(() => {

      animaciones.tiro = true;
      comprobarBase(info.canasta);
      emit('siguiente', info);


    }, 1000);
  }





  reiniciarTemporizador();


}



</script>

<template>
  <main id="main_arcade">
    <RouterLink to="/jugar">
      <img style="right: inherit;" src="@/assets/imagenes/volver.png" alt="Volver" class="imagen_volver">
    </RouterLink>
    <div class="body_arcade">

      <!--
  <h4  >Puntos:  {{ Canastas }} </h4>
  
  
  <RouterLink to="/jugar"> <q-btn color="deep-orange"  size="20px" glossy label="Volver"></q-btn></RouterLink>
 -->


      <div class="bate_balon">
        <img :style="{ zIndex: Zindex.bate }" class="bate" src="@/assets/bioma/bate.png" alt="" srcset="" :class="{
          'animacion_bate': animaciones.bate
        }">
        <img id="balon" :style="{ zIndex: Zindex.balon }" :class="{
          'animacion_bateo1': animaciones.bateo1,
          'animacion_bateo2': animaciones.bateo2,
          'animacion_bateo3': animaciones.bateo3,
          'animacion_tiro': animaciones.tiro,
          'animacion_disolver': animaciones.disolver

        }" src="../assets/bioma/pelota_beisbol.gif" alt="" srcset="">


      </div>
      <div class="poder">
        <div v-if="bases[0]" class="primera"> </div>
        <div v-if="bases[1]" class="segunda"> </div>
        <div v-if="bases[2]" class="tercera"> </div>
        <div v-if="bases[3]" class="home"> </div>
        <img class="campo" src="@/assets/bioma/campo.png" alt="">
      </div>

      <div class="tiempo_fuera">
        <div class="tiempo">{{ props.data.duracion }} </div>
      </div>


      <div class="titul"> {{ props.data.operacion }} </div>

      <div class="respuestas">

        <q-linear-progress instant-feedback :value="progress" :color="color" class=" barra"> </q-linear-progress>

        <div v-for="(respuesta, index) in respuestasMezcladas" :key="index">

          <q-btn color="black" class="botones_partida" glossy label="" @click="responder(respuesta)"
            :disabled="tiroHecho"> {{ respuesta }}</q-btn>


        </div>

      </div>






    </div>
  </main>
</template>

<style scoped>
@keyframes bateo1 {
  0% {
    transform: translateY(0);
    /* Empieza en la parte inferior */

  }

  50% {

    transform: translateY(-200px) scale(0.5) rotate(-90deg);


  }

  100% {
    transform: translateY(-150px) scale(0.1) rotate(-180deg);

    /* Sube 200px hacia arriba */

  }
}


@keyframes primera {
  0% {
    transform: translateY(60px) translateX(-60px);


  }

  100% {
    transform: translateY(0);
    /* Empieza en la parte inferior */

    /* Sube 200px hacia arriba */

  }
}



@keyframes segunda {
  0% {
    transform: translateY(50px) translateX(60px);


  }

  100% {
    transform: translateY(0);
    /* Empieza en la parte inferior */

    /* Sube 200px hacia arriba */

  }
}

@keyframes tercera {
  0% {
    transform: translateY(-55px) translateX(60px);


  }

  100% {
    transform: translateY(0);
    /* Empieza en la parte inferior */

    /* Sube 200px hacia arriba */

  }
}


@keyframes home {
  0% {
    transform: translateY(-60px) translateX(-60px);


  }

  100% {
    transform: translateY(0);
    /* Empieza en la parte inferior */

    /* Sube 200px hacia arriba */

  }
}





@keyframes bateo2 {
  0% {
    transform: translateY(0);
    /* Empieza en la parte inferior */

  }

  50% {

    transform: translateY(-200px) translateX(120px) scale(0.5) rotate(-90deg);


  }

  100% {
    transform: translateY(-190px) translateX(140px) scale(0.1) rotate(-180deg);

    /* Sube 200px hacia arriba */

  }
}

@keyframes bateo3 {
  0% {
    transform: translateY(0);
    /* Empieza en la parte inferior */

  }

  50% {

    transform: translateY(-200px) translateX(-120px) scale(0.5) rotate(-90deg);


  }

  100% {
    transform: translateY(-180px) translateX(-140px) scale(0.1) rotate(-180deg);

    /* Sube 200px hacia arriba */

  }
}




@keyframes tiro {
  0% {

    transform: translate(0, 0) scale(0.1);

  }

  10% {

    transform: translate(0, 0) scale(0.7);

  }

  100% {
    transform: translate(0, 0) scale(1.5);

  }



}

@keyframes disolver {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}


@keyframes bateo {
  0% {
    transform-origin: 0 50%;
    transform: scaleX(-1) translateX(40px) translateY(-50px);

  }

  100% {
    transform-origin: 0 50%;
    transform: scaleX(-1) translateX(-80px) translateY(-50px) rotate(250deg);

  }


}

.animacion_disolver {
  animation: disolver 0.2s linear;
}

.poder {
  width: 120px;
  height: 120px;
  border: 1px solid white;
  position: absolute;
  right: 0;
  top: 25%;
  overflow: hidden;

}

.primera {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 50%;
  background-color: blueviolet;
  margin-left: 200px;
  margin-top: 150px;
  z-index: 2;
  animation: primera 0.5s linear;


}

.segunda {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 50%;
  background-color: blueviolet;
  margin-left: 140px;
  margin-top: 100px;
  z-index: 2;
  animation: segunda 0.5s linear;

}

.tercera {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 50%;
  background-color: blueviolet;
  margin-left: 80px;
  margin-top: 150px;
  z-index: 2;
  animation: tercera 0.5s linear;

}


.home {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1px solid white;
  border-radius: 50%;
  background-color: blueviolet;
  margin-left: 140px;
  margin-top: 220px;
  z-index: 2;
  animation: home 0.5s linear;

}

.bate {
  position: absolute;
  height: 200px;

  margin-left: -150px;




}

.animacion_bate {
  animation: bateo 0.5s linear;
}

.q-btn:disabled {
  opacity: 1 !important;
  /* Elimina la opacidad */

}


.animacion_bateo1 {
  animation: bateo1 0.5s linear infinite;
}

.animacion_bateo2 {
  animation: bateo2 0.5s linear;
}

.animacion_bateo3 {
  animation: bateo3 0.5s linear;
}

.animacion_tiro {

  animation: tiro 7s linear;
}



.imagen_volver {
  position: fixed;
  top: 20px;
  left: 20px;
  width: 40px;
  border: 2px solid white;
  border-radius: 5px;
}


.bate_balon {
  grid-row: 4;
  grid-column: 2;
}


#balon {
  height: 150px;
  width: 150px;
  justify-self: center;
  border-radius: 50%;






}

.campo {
  position: absolute;
  width: 140px;
  margin-left: -68px;
  margin-top: -15px;
}


#canasta {
  grid-row: 1;
  grid-column: span 3;
  justify-self: center;
  margin-bottom: 80px;



}

#canasta .tablero {

  width: 200px;
  z-index: 0;

}


#canasta .aro {

  position: absolute;
  top: 0;
  width: 100px;
  margin-top: 140px;
  margin-left: 50px;



}




.body_arcade {
  grid-column: span 3;
  text-align: center;
  grid-row: span 2;
  max-height: 80vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 3fr 2fr 1fr 1fr 3fr;




}

.arcade {
  display: grid;
  grid-column: span 3;
  grid-row: 3;

}


@font-face {
  font-family: 'DS-Digital';
  src: url('../assets/fuente/DS-DIGI.TTF') format('truetype');
}


.titul {
  grid-row: 1;
  grid-column: 1 / 4;
  ;
  height: 70px;
  font-size: 50px;
  border: 1px solid black;
  background-color: white;
  text-align: center;
  margin-top: 60px;

}

.tiempo_fuera {

  grid-column: 2;
  grid-row: 1;
  place-items: center;



}

.tiempo {
  border: 1px solid black;
  font-size: 30px;
  font-family: 'DS-Digital';
  text-shadow: 0 0 5px #f00, 0 0 10px #f00, 0 0 20px #f00, 0 0 30px #f00, 0 0 40px #f00, 0 0 50px #f00;
  color: rgb(255, 112, 112);
  background-color: black;
  grid-column: 2;
  place-items: center;
  border: 5px solid rgb(70, 70, 70);
  width: 70px;
  margin: 0 auto;
  text-align: center;
  grid-row: 3;


}

.problema {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-align: center;

}

.respuestas {
  display: grid;
  grid-column: span 3;
  grid-template-columns: 1fr 1fr;
  grid-row: 5;


}


@media screen and (min-width: 500px) {
  .botones_partida {

    width: 90%;
    margin: 10px;
    font-size: 50px !important;

  }



}




.botones_partida {

  width: 90%;
  margin: 10px;
  font-size: 30px;
  align-self: end;

}

.barra {
  height: 20px;
  grid-column: span 2;

}

@media screen and (min-width: 750px) {
  .botones_partida {

    width: 70%;
    font-size: 50px;
    border-radius: 20px;

  }

  .respuestas {
    display: grid;
    grid-column: span 3;
    grid-template-columns: 1fr 1fr;


  }


  .body_arcade {

    max-height: 100vh;

  }

  .campo {
    position: absolute;
    width: 330px;
    margin-left: -165px;
    margin-top: -25px;
  }

  .poder {
    width: 300px;
    height: 300px;
    border: 1px solid white;
    position: absolute;
    right: 0;
    top: 25%;
    overflow: hidden;

  }

}
</style>
