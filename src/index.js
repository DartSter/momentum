import { showTime } from "./js/showTime";
import { showPlaceholder } from "./js/showPlaceholder";
import { setLS, getLS } from "./js/controlLocalStorage";
import { setBg, getSlideNext, getSlidePrev } from "./js/controlSlider";
import { getWeather } from "./js/getWeather";
import { qoutes } from "./js/quotes";
import { getQutes } from "./js/getQuotes";
import playList from "./js/playList";
import Player from "./js/player";

const lang = "en-US";

// time, date and greeting

const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");

showTime(time, date, greeting, lang);

// name placeholder

const name = document.querySelector(".name");
if (!localStorage.getItem("name")) showPlaceholder(name, lang);
name.addEventListener("change", (event) => {
  if (!event.target.value) {
    showPlaceholder(name, lang);
  }
});

// slider

const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");

setBg();
slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

// weather widget

const city = "%D0%9C%D0%B8%D0%BD%D1%81%D0%BA";
let language = "ru";
const cityInput = document.querySelector(".city");

getWeather(city, language);

// weather placeholder

cityInput.placeholder = lang === "ru-RU" ? "Минск" : "Minsk";
cityInput.addEventListener("change", (e) => {
  e.target.value
    ? getWeather(e.target.value, language)
    : getWeather(city, language);
});

// quotes

const quote = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".author");
const changeQoute = document.querySelector(".change-quote");

getQutes(quote, quoteAuthor, lang, qoutes);
changeQoute.addEventListener("click", () => {
  getQutes(quote, quoteAuthor, lang, qoutes);
});

// advanced audio player
let isPlay = false;
const player = new Player(playList);
let currentSong = player.getSongElement();
const playButton = document.querySelector(".play");
const playPrevButton = document.querySelector(".play-prev");
const playNextButton = document.querySelector(".play-next");
const playListElement = document.querySelector(".play-list");
const songName = document.querySelector(".song-name");
const songDuration = document.querySelector(".song-duration");
const progressBar = document.querySelector(".progress-bar");
const soundButton = document.querySelector(".sound");
const soundBar = document.querySelector(".sound-bar");
let volume = 100;
function checkIsPlay() {
  if (!isPlay) {
    isPlay = !isPlay;
    playButton.classList.toggle("pause");
  }
}

player.createPlayList(playListElement);

playButton.addEventListener("click", () => {
  playButton.classList.toggle("pause");
  isPlay = !isPlay;
  player.play(isPlay, progressBar);
  songName.textContent = player.getSongName();
});
playPrevButton.addEventListener("click", () => {
  checkIsPlay();
  player.playPrev();
  currentSong = player.getSongElement();
  songName.textContent = player.getSongName();
});
playNextButton.addEventListener("click", () => {
  checkIsPlay();
  player.playNext();
  currentSong = player.getSongElement();
  songName.textContent = player.getSongName();
});

playListElement.addEventListener("click", (e) => {
  checkIsPlay();
  player.changeSong(e.target.dataset.ind, isPlay);
  currentSong = player.getSongElement();
  songName.textContent = player.getSongName();
});

currentSong.addEventListener("ended", () => {
  player.playNext();
  currentSong = player.getSongElement();
});

progressBar.addEventListener("change", () => {
  player.changSongTime(progressBar);
});

soundBar.addEventListener("change", () => {
  player.changeSound(soundBar.value);
});

soundButton.addEventListener("click", () => {
  soundButton.classList.toggle("mute");
  if (soundButton.classList.contains("mute")) {
    player.changeSound(0);
    volume = soundBar.value;
    soundBar.value = 0;
  } else {
    player.changeSound(volume);
    soundBar.value = volume;
  }
});

setInterval(() => {
  player.getSongTiming(songDuration, progressBar, isPlay);
}, 500);

// add elements to local storage

function setLocalStorage() {
  //add name
  setLS("name", name);
  //add city
  setLS("city", cityInput);
}

window.addEventListener("beforeunload", setLocalStorage);

// get elements from local storage

function getLocalStorage() {
  //get name
  getLS("name", name);
  //get city
  getLS("city", cityInput);
}

window.addEventListener("load", getLocalStorage);
