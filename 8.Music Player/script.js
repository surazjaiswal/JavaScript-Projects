const img = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const durationDisplay = document.getElementById("duration");
const currTimeDisplay = document.getElementById("current-time");

const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Fornt Row (Remix)",
    artist: "Metric/Jacinto Design",
  },
];

// check if playing
let isPlaying = false;

// play
function playSong() {
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");

  isPlaying = true;
  music.play();
}

// pause
function pauseSong() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  isPlaying = false;
  music.pause();
}

// play pasue event listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// prev song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// load songs on first loading
loadSong(songs[songIndex]);

// update progress bar and time
function updateProgress(e) {
  if (isPlaying) {
    // console.log(e);
    const { duration, currentTime } = e.srcElement; // destructuring objects
    // console.log(duration, currentTime);
    // update progress percentage
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // adding delay for duration calculation
    if (durationSeconds) {
      durationDisplay.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    // calculate display for current-time
    const currentTimeMinutes = Math.floor(currentTime / 60);
    let currentTimeSeconds = Math.floor(currentTime % 60);
    if (currentTimeSeconds < 10) {
      currentTimeSeconds = `0${currentTimeSeconds}`;
    }
    currTimeDisplay.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
  }
}

// update progress bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const x_offset = e.offsetX;
  const { duration } = music;
  music.currentTime = (x_offset / width) * duration;
}

//  Event Listener
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgressBar);
