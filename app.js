const song = document.getElementById("song");
const btnPlay = document.querySelector(".fa-play");
const btnNext = document.querySelector(".fa-forward-fast");
const btnBack = document.querySelector(".fa-backward-fast");
const randomSong = document.querySelector(".fa-shuffle");
const repeatSong = document.querySelector(".fa-repeat");
let remainingTime = document.querySelector(".remaining");
let durationTime = document.querySelector(".duration");
let rangeBar = document.querySelector(".range");
let musicName = document.querySelector(".music-name");
let musicImage = document.querySelector(".music-thumb img");
let musicThumb = document.querySelector("img");
let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
const musics = [
  {
    id: 1,
    title: "Holo",
    file: "holo.mp3",
    image:
      "https://i.pinimg.com/550x/8a/2f/6e/8a2f6e3e31fe07ecefcb10c16f32eea4.jpg",
  },
  {
    id: 2,
    title: "Home",
    file: "home.mp3",
    image:
      "https://www.sharechung.com/wp-content/uploads/2021/08/hotgirl-pham-trang-5.jpg",
  },
  {
    id: 3,
    title: "Summer",
    file: "mp3_music_summer.mp3",
    image: "https://tieudung24g.net/ban-gai-xemesis/imager_83677.jpg",
  },
  {
    id: 4,
    title: "Spark",
    file: "spark.mp3",
    image: "https://andromeda.vn/data/News/tran-thanh-tam-1.jpg",
  },
];

// Play music
const playPause = () => {
  if (isPlaying) {
    musicThumb.classList.add("isplaying");
    song.play();
    isPlaying = false;
    document.getElementById("pause").classList.add("fa-pause");
    document.getElementById("pause").classList.remove("fa-play");
  } else {
    musicThumb.classList.remove("isplaying");
    song.pause();
    isPlaying = true;
    document.getElementById("pause").classList.add("fa-play");
    document.getElementById("pause").classList.remove("fa-pause");
  }
};
btnPlay.addEventListener("click", playPause);
//Next song when song ended
song.addEventListener("ended", function () {
  if (isRepeat) {
    //Handle if isRepeat is true
    isPlaying = true;
    playPause();
  } else {
    activeMusic(1);
  }
});
//Next and Back song
const activeMusic = (dir) => {
  //Next music
  if (dir === 1) {
    indexSong++;
    if (indexSong >= musics.length) {
      indexSong = 0;
    }
    isPlaying = true;
  }
  //Back music
  if (dir === -1) {
    indexSong--;
    if (indexSong < 0) {
      indexSong = musics.length - 1;
    }
    isPlaying = true;
  }
  innit(indexSong);
  playPause();
};

btnNext.addEventListener("click", function () {
  activeMusic(1);
});
btnBack.addEventListener("click", function () {
  activeMusic(-1);
});

//Random song
const randSong = () => {
  indexSong = Math.floor(Math.random() * musics.length);
  isPlaying = true;
  song.setAttribute("src", `./music/${musics[indexSong].file}`);
  playPause();
};
randomSong.addEventListener("click", randSong);

//Repeat song
repeatSong.addEventListener("click", function () {
  if (isRepeat) {
    isRepeat = false;
    repeatSong.style.color = "black";
  } else {
    isRepeat = true;
    repeatSong.style.color = "red";
  }
});

//Timer
const displayTimer = () => {
  const { duration, currentTime } = song;
  rangeBar.max = duration;
  rangeBar.value = currentTime;
  if (!duration) {
    durationTime.textContent = "00:00";
  } else {
    durationTime.textContent = formatTimer(duration);
  }
  remainingTime.textContent = formatTimer(currentTime);
};
const formatTimer = (numberTime) => {
  let minutes = Math.floor(numberTime / 60);
  let seconds = Math.floor(numberTime - minutes * 60);
  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};
setInterval(displayTimer, 500);

//Range Input
const rangeChange = () => {
  song.currentTime = rangeBar.value;
};
rangeBar.addEventListener("change", rangeChange);

//Init layout
const innit = (indexSong) => {
  song.setAttribute("src", `./music/${musics[indexSong].file}`);
  displayTimer();
  musicImage.setAttribute("src", musics[indexSong].image);
  musicName.textContent = musics[indexSong].title;
};
innit(indexSong);
