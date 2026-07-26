const playlistSongs = document.getElementById("playlistSongs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const shuffleButton = document.getElementById("shuffle");
const addSongBtn = document.getElementById("addSongBtn");
const inputSongName = document.getElementById("songName");
const inputSongURL = document.getElementById("songURL");

const allSongs = [
  {
    id: 5,
    title: "Chase",
    src: "./songs/chase.mp3",
  },
  {
    id: 6,
    title: "The Army of Minotaur",
    src: "./songs/The-Army-of-Minotaur(chosic.com).mp3",
  },
  {
    id: 7,
    title: "Saga of Knight",
    src: "./songs/Saga-of-Knight(chosic.com).mp3",
  },
  {
    id: 0,
    title: "Scratching The Surface",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3",
  },
  {
    id: 1,
    title: "Can't Stay Down",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3",
  },
  {
    id: 2,
    title: "Still Learning",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3",
  },
  {
    id: 3,
    title: "Cruising for a Musing",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3",
  },
  {
    id: 4,
    title: "Never Not Favored",
    src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3",
  },
  
];

const music = new Audio();
let songs = [...allSongs];
let currentSong = null;
let songTime = 0;

const shuffle = () => {
  console.log("shuffle start.");
  songs.sort(() => Math.random() - 0.5);
  currentSong = null;
  songTime = 0;

  renderSongs(songs);
  pauseSong();
  displayInfo();
  console.log("shuffle success.");
};

const deleteSong = (id) => {
  if (currentSong?.id === id) {
    currentSong = null;
    songTime = 0;

    pauseSong();
    displayInfo();
    const playingSong = document.getElementById("songTitle");
    const songArtist = document.getElementById("songArtist");
    playingSong.textContent = "";
    songArtist.textContent = "";
  }
  songs = songs.filter((song) => song.id !== id);
  renderSongs(songs);
  console.log("song deleted..")
};

const displayInfo = () => {
  const playingSong = document.getElementById("songTitle");
  const songArtist = document.getElementById("songArtist");
  const title = currentSong?.title;
  const artist = currentSong?.artist;

  playingSong.textContent = title ? title : "";
  songArtist.textContent = artist ? artist : "";
};

const playSong = (id) => {
  console.log("playsong function.");
  const song = songs.find((song) => song.id === id);
  music.src = song.src;
  music.title = song.title;
console.log(song?.title);
  if (currentSong === null || currentSong.id !== song.id) {
    music.currentTime = 0;
  } else {
    music.currentTime = songTime;
  }
  currentSong = song;
  music.play();
  displayInfo();
};

const pauseSong = () => {
  songTime = music.currentTime;
  music.pause();
};
const playNextSong = () => {
  if (currentSong === null) {
    playSong(songs[0].id);
  } else {
    const currentSongIndex = songs.indexOf(currentSong);
    const nextSong = songs[currentSongIndex + 1];
    playSong(nextSong.id);
  }
};

const renderSongs = (arr) => {
  console.log("music rendering.");
  const songsRender = arr
    .map(
      ({ id, title }) => `
    <li id="song-${id}" class="playlistSong">
      <button class="info" onclick="playSong(${id})">
          <span class="title">${title}</span>
      </button>
      <button onclick="deleteSong(${id})" class="deleteBtn">
          x
        </button>
      </li>
    `,
    )
    .join("");
  playlistSongs.innerHTML = songsRender;
};

async function isValidSongUrl(url) {
  try {
    const url = new URL(url);
    // Ensure it uses http or https protocols
    if (url.protocol !== "http:" || url.protocol !== "https:") {
      return false;
    }
  } catch (error) {
    return false;
  }
  try {
    const response = await fetch(url, { method: "HEAD" });

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      // Verify the response\
      console.log("url is valids..");
      return contentType && contentType.startsWith("audio/");
    }
    return false;
  } catch (error) {
    console.error("message", error.message);
    return false;
  }
}

const addSong = () => {
  const songName = inputSongName.value.trim();
  const songURL = inputSongURL.value;

  if (songName === "" || songURL === "") {
    alert("enter valid fields.");
    return;
  }
  if (!isValidSongUrl(songURL)) {
    alert("url is not valid");
    return;
  }
  const newSong = {
    id: Math.floor(Math.random() * 100000),
    title: songName,
    src: songURL,
  };
  songs.unshift(newSong);
  console.log("song added succesfully");
  renderSongs(songs);
};

playButton.addEventListener("click", () => {
  if (currentSong === null) {
    playSong(songs[0].id);
  } else {
    playSong(currentSong.id);
  }
});
pauseButton.addEventListener("click", pauseSong);

shuffleButton.addEventListener("click", shuffle);

music.addEventListener("ended", () => {
  const currentSongIndex = songs.findIndex(currentSong);

  const nextSong = songs[currentSongIndex + 1] !== undefined;

  if (nextSong) {
    playNextSong();
  } else {
    currentSong = null;
    songTime = 0;
    pauseSong();
    displayInfo();
  }
});

addSongBtn.addEventListener("click", addSong);

renderSongs(songs);
