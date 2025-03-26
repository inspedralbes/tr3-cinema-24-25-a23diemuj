<template>
   <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
  <div class="music-player" v-if="ActivarMusica">
    <q-btn-dropdown rounded  content-style="background-image: url('/bioma/musica.png'); background-size: cover; 
    background-position: center center; 
    background-repeat: no-repeat; border:1px solid black"  class="glossy" color="black" icon="eva-music-outline" menu-anchor="top right"
      menu-self="bottom right" size="25px">

      <div class="music-info">
        <p>{{ currentTrack.name }}</p>
        <p>{{ currentTrack.artist }}</p>
      </div>

      <!-- Barra de progreso -->
      <div class="progress-container">
        <input type="range" min="0" :max="duration" v-model="currentTime" @input="seekTrack" class="progress-bar" />
        <div class="time-display">
          <span>{{ formatTime(currentTime) }}</span> / <span>{{ formatTime(duration) }}</span>
        </div>
      </div>

      <div class="controls">
        <q-btn round color="black" @click="backTrack" icon="eva-rewind-left-outline" glossy />
        <q-btn v-if="parado" round color="black" @click="playTrack" icon="eva-play-circle-outline" glossy />
        <q-btn v-else round color="black" @click="pauseTrack" icon="eva-pause-circle-outline" glossy />
        <q-btn round color="black" @click="nextTrack" icon="eva-rewind-right-outline" glossy />
      </div>

    </q-btn-dropdown>
    <audio ref="audio" :src="currentTrack.url" autoplay @ended="nextTrack" @timeupdate="updateProgress" @loadedmetadata="loadMetadata"></audio>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useCounterStore } from '@/stores/counter';

const parado = ref(true);
const currentTime = ref(0);
const duration = ref(0);
const audio = ref(null);

const useApp = useCounterStore();
const ActivarMusica = computed(() => useApp.ActivarMusica);
 
function mezclarMusica() {
  return [
    { name: 'af1', artist: 'lilbubblegum', url: '/songs/menu/af1.mp3' },
    { name: 'before i close my eyes', artist: 'XXX Tentacion', url: '/songs/menu/before I close my eyes.mp3' },
    { name: 'Bleed Out', artist: 'd4vd', url: '/songs/menu/d4vd - Bleed Out (Official Audio).mp3' },
    { "name": "Feel It", "artist": "d4vd", "url": "/songs/menu/d4vd - Feel It (Audio).mp3" },
    { "name": "Has To Be", "artist": "capzlock", "url": "/songs/menu/Has To Be.mp3" },
    { "name": "I'm Ready", "artist": "Jaden", "url": "/songs/menu/Jaden - I'm Ready Marvel's Spider-Man_ Miles Morales OST.mp3" },
    { "name": "WORLDSTAR MONEY", "artist": "joji", "url": "/songs/menu/joji - WORLD$TAR MONEY.mp3" },
    { "name": "734", "artist": "Juice WRLD", "url": "/songs/menu/Juice WRLD - 734 (Official Visualizer).mp3" },
    { "name": "I'm Still", "artist": "Juice WRLD", "url": "/songs/menu/Juice WRLD - I'm Still (Official Audio).mp3" },
    { "name": "Legends", "artist": "Juice WRLD", "url": "/songs/menu/Juice WRLD - Legends (Official Audio).mp3" },
    { "name": "Heart Racing", "artist": "Kanii, Riovaz, & Nimstarr", "url": "/songs/menu/Kanii, Riovaz, & Nimstarr - Heart Racing (Lyrics).mp3" },
    { "name": "Lucid Dreams", "artist": "Juice WRLD", "url": "/songs/menu/Lucid Dreams.mp3" },
    { "name": "7AM", "artist": "Playboi Carti", "url": "/songs/menu/Playboi Carti - 7AM [Prod. Adrian] (639Hz).mp3" },
    { "name": "9 AM in Calabasas", "artist": "Playboi Carti", "url": "/songs/menu/Playboi Carti - 9 AM in Calabasas (prod by adrian)(slowed and reverb).mp3" },
    { "name": "Feel Like God", "artist": "Playboi Carti", "url": "/songs/menu/Playboi Carti - Feel Like God ( Gazzzy Remix ) [prod. miyokibeats].mp3" },
    { "name": "one more", "artist": "Playboi Carti", "url": "/songs/menu/Playboi Carti - one more (prod.ta2cute).mp3" },
    { "name": "Sunflower", "artist": "Post Malone", "url": "/songs/menu/Post Malone - Sunflower (Lyrics) ft. Swae Lee.mp3" },
    { "name": "Beautiful Girl", "artist": "Post Malone & XXXTENTACION", "url": "/songs/menu/Post Malone & XXXTENTACION Beautiful Girl (Lyrics).mp3" },
    { "name": "Righteous", "artist": "Juice WRLD", "url": "/songs/menu/Righteous.mp3" },
    { "name": "Superhero", "artist": "Metro Boomin", "url": "/songs/menu/Superhero (Heroes & Villains).mp3" },
    { "name": "Kill Bill", "artist": "SZA", "url": "/songs/menu/SZA - Kill Bill (Official Audio).mp3" },
    { "name": "Tell Me U Luv Me", "artist": "JUICE WRLD", "url": "/songs/menu/Tell Me U Luv Me.mp3" },
  ] 
}

const playlist = mezclarMusica(); 
const currentTrackIndex = ref(12);
if(useApp.musicaInicio==1){
currentTrackIndex.value=Math.floor(Math.random() * playlist.length); 
}
useApp.musicaInicio=1;
const currentTrack = reactive({
  name: playlist[currentTrackIndex.value]?.name || '',
  artist: playlist[currentTrackIndex.value]?.artist || '',
  url: playlist[currentTrackIndex.value]?.url || '',
});
parado.value = false;

const updateTrack = () => {
  const track = playlist[currentTrackIndex.value];
  currentTrack.name = track.name;
  currentTrack.artist = track.artist;
  currentTrack.url = track.url;
  if (audio.value) {
    audio.value.load();
    audio.value.play().then(() => parado.value = false);
  }
};

// 🎵 **Actualizar progreso de la barra**  
const updateProgress = () => {
  if (audio.value) {
    currentTime.value = audio.value.currentTime;
  }
};

// ⏳ **Cargar duración total de la canción**  
const loadMetadata = () => {
  if (audio.value) {
    duration.value = audio.value.duration;
  }
};

// ⏩ **Permitir adelantar o retroceder con la barra**  
const seekTrack = () => {
  if (audio.value) {
    audio.value.currentTime = currentTime.value;
  }
};

// 🎶 **Formato de tiempo (mm:ss)**  
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const nextTrack = () => {
  currentTrackIndex.value = (currentTrackIndex.value + 1) % playlist.length;
  updateTrack();
};

const backTrack = () => {
  currentTrackIndex.value = (currentTrackIndex.value - 1 + playlist.length) % playlist.length;
  updateTrack();
};

const playTrack = () => {
  audio.value.play();
  parado.value = false;
};

const pauseTrack = () => {
  audio.value.pause();
  parado.value = true;
};

const startMusicOnInteraction = () => {
  if (audio.value) {
    audio.value.play().then(() => {
      parado.value = false;
      document.removeEventListener('click', startMusicOnInteraction);
      document.removeEventListener('touchstart', startMusicOnInteraction);
    }) 
  }
};

onMounted(() => {
  
  document.addEventListener('click', startMusicOnInteraction);
  document.addEventListener('touchstart', startMusicOnInteraction);
  
});
</script>


<style scoped>
 
.music-player {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  position: absolute;
  right: 0;
  margin-right: 20px;
  border-radius: 10px; 
  max-width: 150px; 
  
   
}

.music-info {
  margin-top: 10px;
  text-align: center;
  font-size: 10px;
  font-family: 'Press Start 2P', cursive;
  color: white;
}

.progress-container {
  width: 100%;
  margin: 10px 0;
  padding: 0 10px;
}

.progress-bar {
  width: 100%;
  cursor: pointer;
  appearance: none;
  background: linear-gradient(90deg, #8c00ff 0%, #000000 100%);
  height: 8px;
  border-radius: 5px;
  outline: none;
}

.progress-bar::-webkit-slider-thumb {
  appearance: none;
  width: 15px;
  height: 15px;
  
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.time-display {
  font-size: 14px;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  color: white;
}

.controls {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
}

.controls button {
  margin: 0.5rem;
  transition: transform 0.3s ease;
}

.controls button:hover {
  transform: scale(1.1);
}

.controls button:active {
  transform: scale(1);
}
</style>

