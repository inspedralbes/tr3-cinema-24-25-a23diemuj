<template>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
<div class="music-player" v-if="!ActivarMusica">
    <q-btn-dropdown rounded  content-style="background-image: url('/bioma/musica.png'); background-size: cover; 
    background-position: center center; 
    background-repeat: no-repeat; "   class="glossy" color="black" icon="eva-music-outline" menu-anchor="top right"
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
  { "name": "redrum", "artist": "21 Savage", "url": "/songs/juego/21 Savage - redrum (Official Audio).mp3" },
  { "name": "You and I", "artist": "d4vd", "url": "/songs/juego/d4vd - You and I [Official Lyric Video].mp3" },
  { "name": "You Are My High", "artist": "DJ Snake", "url": "/songs/juego/DJ Snake - You Are My High (Official Audio).mp3" },
  { "name": "I Know", "artist": "Kanii", "url": "/songs/juego/Kanii - I Know.mp3" },
  { "name": "Watch This", "artist": "Lil Uzi Vert", "url": "/songs/juego/Lil Uzi Vert - Watch This (Lyrics) Pluggnb Remix.mp3" },
  { "name": "Annihilate", "artist": "Metro Boomin", "url": "/songs/juego/Metro Boomin - Annihilate.mp3" },
  { "name": "Self Love", "artist": "Metro Boomin", "url": "/songs/juego/Metro Boomin - Self Love.mp3" },
  { "name": "Care", "artist": "midwxst", "url": "/songs/juego/midwxst - Care (Lyric Video).mp3" },
  { "name": "i know you hate me", "artist": "midwxst", "url": "/songs/juego/midwxst - i know you hate me (Lyrics).mp3" },
  { "name": "24 Songs", "artist": "Playboi Carti", "url": "/songs/juego/Playboi Carti - 24 Songs (Official Audio).mp3" },
  { "name": "bando", "artist": "Playboi Carti", "url": "/songs/juego/Playboi Carti - bando (prod.ta2cute x yugen).mp3" },
  { "name": "Youre a Parasite", "artist": "Riovaz", "url": "/songs/juego/Riovaz - Youre a Parasite.mp3" },
  { "name": "Escape Your Love", "artist": "SSGKobe", "url": "/songs/juego/SSGKobe - Escape Your Love (Feat. Trippie Redd).mp3" },
  { "name": "MIA", "artist": "SSGKobe", "url": "/songs/juego/SSGKobe - MIA (AUDIO).mp3" },
  { "name": "Less Than Zero", "artist": "The Weeknd", "url": "/songs/juego/The Weeknd - Less Than Zero (Audio).mp3" },
  { "name": "SDP Interlude", "artist": "Travis Scott", "url": "/songs/juego/Travis Scott - SDP Interlude.mp3" },
  { "name": "Miss The Rage", "artist": "Trippie Redd", "url": "/songs/juego/Trippie Redd Miss The Rage.mp3" }
].sort(() => Math.random() - 0.5);
}

const playlist = mezclarMusica();
const currentTrackIndex = ref(0);
const currentTrack = reactive({
  name: playlist[0]?.name || '',
  artist: playlist[0]?.artist || '',
  url: playlist[0]?.url || '',
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
  z-index: 100;
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
  background: linear-gradient(90deg, #000000 0%, #00c6ff 100%);
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
