const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const pauseBtn = document.getElementById("pauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const musicImage = document.querySelector(".musicImage");
const playlistItems = document.querySelectorAll(".sidebar ul li");
const body = document.body;
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

let currentSongIndex = 0;

// Play
playBtn.addEventListener("click", () => {
  audio.play();
  musicImage.classList.add("playing");
});

// Pause
pauseBtn.addEventListener("click", () => {
  audio.pause();
  musicImage.classList.remove("playing");
});

// Previous
prevBtn.addEventListener("click", () => {
  currentSongIndex =
    (currentSongIndex - 1 + playlistItems.length) % playlistItems.length;
  playSong(currentSongIndex);
});

// Next
nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
  playSong(currentSongIndex);
});

// Playlist click handler
playlistItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    playSong(index);
  });
});

function playSong(index) {
  const songSrc = playlistItems[index].getAttribute("data-src");
  audio.src = songSrc;
  audio.play();
  musicImage.classList.add("playing");

  playlistItems.forEach(li => li.classList.remove("active"));
  playlistItems[index].classList.add("active");

  currentSongIndex = index;
}

// Update progress bar while playing
audio.addEventListener("timeupdate", () => {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

// Seek
progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  if (seconds < 10) seconds = "0" + seconds;
  return `${minutes}:${seconds}`;
}

audio.addEventListener("ended", () => {
  currentSongIndex = (currentSongIndex + 1) % playlistItems.length;
  playSong(currentSongIndex);
});