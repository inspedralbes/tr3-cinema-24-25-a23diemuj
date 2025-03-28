import { ref, computed, reactive } from 'vue'

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  

  const ActivarMusica=ref(true);

  const ApagarMusica = () => {
      ActivarMusica.value=false;
  }
  const EncenderMusica = () => {
      ActivarMusica.value=true;
  }
  const musicaInicio = ref(0);

  const loginInfo = reactive({
    loggedIn: true,
    username: '',
  
  });

 

  const tiroTenis = ref(4);

  const SalaActual= ref("");
  


  const getLoginInfo = computed(() => loginInfo);



  return { 
    getLoginInfo, loginInfo,ActivarMusica,SalaActual,tiroTenis, musicaInicio,ApagarMusica, EncenderMusica


  }
})
