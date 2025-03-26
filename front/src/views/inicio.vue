<script setup>

</script>

<template>
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">

  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <main id="main_inicio">
 <div id="div_inicio">
   <img src="/bioma/logo.png" width="350px" height="320px" alt="Logo"><br>
    <q-btn class="botones_menu" glossy size="40px" @click="$router.push('/jugar')"><span style="font-size: 150px;" class="material-icons">play_arrow</span> </q-btn> 
 </div>
 
  </main>

  
</template>


<style scoped>

#main_inicio{
  text-align: center;
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 100vh;
  font-family: 'Press Start 2P', cursive;

}
#div_inicio{

  grid-row:2 ;
  

}

.botones_menu {

   height: 150px;  

   padding: 0;
   width: 300px;
   display: inline;
   font-size: 26px;
   border: 1px solid black;
   background-color: #000000;
   color: #ffffff;
   border: none;
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
