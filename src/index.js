import { showTime } from "./js/showTime";
import { showPlaceholder } from "./js/showPlaceholder";
import { setLS, getLS } from "./js/controlLocalStorage";
import { setBg, getSlideNext, getSlidePrev } from "./js/controlSlider";
import { getWeather } from "./js/getWeather";
import { qoutes } from "./js/quotes";
import { getQutes } from "./js/getQuotes";
import playList from "./js/playList";
import Player from "./js/player";
import { translateMenu } from "./js/translateMenu";

import TodoList from "./js/TodoList";

let lang = localStorage.getItem("lang")
  ? localStorage.getItem("lang") === "EN"
    ? "en-US"
    : "ru-RU"
  : "en-US";

const state = localStorage.getItem("state")
  ? JSON.parse(localStorage.getItem("state"))
  : {
      photoSource: "github",
      tag: "",
      blocks: [
        "time",
        "date",
        "greeting-container",
        "quote-container",
        "weather",
        "player",
        "todolist-container",
      ],
    };

function updateState() {
  localStorage.setItem("state", JSON.stringify(state));
}

// settings

const settingsBtn = document.querySelector(".settings-btn");
const settingsContainer = document.querySelector(".settings");

translateMenu(lang);

settingsBtn.addEventListener("click", () => {
  settingsContainer.classList.toggle("show");
});

// select apps
const appSelectElement = document.querySelector(".selected-list");
const appSelectBtns = appSelectElement.querySelectorAll(".setting-item");
const appList = document.querySelectorAll(".app");

function updateAppSelect() {
  appSelectBtns.forEach((i) => {
    state.blocks.includes(i.dataset.block)
      ? i.classList.add("active-app")
      : i.classList.remove("active-app");
  });
}

updateAppSelect();

function renderApp() {
  appList.forEach((i) => {
    state.blocks.includes(i.classList[0])
      ? i.classList.remove("hide")
      : i.classList.add("hide");
  });
}

renderApp();

appSelectElement.addEventListener("click", (e) => {
  if (!e.target.dataset.block) return;

  const appName = e.target.dataset.block;
  state.blocks.includes(appName)
    ? (state.blocks = state.blocks.filter((i) => i != appName))
    : state.blocks.push(appName);
  updateAppSelect();
  updateState();
  renderApp();
});

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
const imageApiElement = document.querySelector(".image-api");
const slideNext = document.querySelector(".slide-next");
const slidePrev = document.querySelector(".slide-prev");
const imageApiBtns = imageApiElement.querySelectorAll(".setting-item");
const imageTag = document.querySelector(".apiTag");

imageApiBtns.forEach((i) => {
  if (i.dataset.api === state.photoSource) i.classList.add("active-api");
});

// / search by tags

imageTag.placeholder =
  lang === "en-US" ? "Input background theme" : "Тема фона на английском";

function checkApiName() {
  state.photoSource === "github"
    ? (imageTag.disabled = true)
    : (imageTag.disabled = false);
  imageTag.disabled
    ? imageTag.classList.add(`hide`)
    : imageTag.classList.remove(`hide`);
}

checkApiName();

imageTag.addEventListener("change", (e) => {
  const tag = e.target.value;
  setBg(state.photoSource, tag);
  state.tag = tag;
  updateState();
  imageTag.value = "";
});

// /clear tag

const clearTag = document.querySelector(".remove-tag");
clearTag.textContent = lang === "en-US" ? `Remove tag` : `Удалить тег`;
clearTag.addEventListener("click", () => {
  state.tag = "";
  updateState();
  setBg(state.photoSource);
});

imageApiElement.addEventListener("click", (e) => {
  state.photoSource = e.target.dataset.api;
  setBg(state.photoSource);
  updateState();
  imageApiBtns.forEach((i) => i.classList.remove("active-api"));
  e.target.classList.add("active-api");
  checkApiName();
});

setBg(state.photoSource, state.tag);
slideNext.addEventListener("click", () =>
  getSlideNext(state.photoSource, state.tag)
);
slidePrev.addEventListener("click", () =>
  getSlidePrev(state.photoSource, state.tag)
);

// weather widget

const city = "%D0%9C%D0%B8%D0%BD%D1%81%D0%BA";
let language = lang === "ru-RU" ? "ru" : "en";
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

// Translate

const languageBtn = document.querySelector(".language");

languageBtn.addEventListener("click", (e) => {
  e.target.textContent === "EN"
    ? (e.target.textContent = "РУС")
    : (e.target.textContent = "EN");
  lang = e.target.textContent === "EN" ? "en-US" : "ru-RU";
  //add lang
  localStorage.setItem("lang", languageBtn.textContent);
  location.reload();
});
if (!localStorage.getItem("lang")) languageBtn.textContent = "EN";

// todo list
const todoTitle = document.querySelector(".todo-title");
todoTitle.textContent = lang === "en-US" ? "To do today" : "Дела сегодня";
const todoListElement = document.querySelector(".todo-list");
const taskInputElement = document.querySelector(".todo");
taskInputElement.placeholder =
  lang === "en-US" ? "[What to do?]" : "[Какие планы?]";
const taskArray = !localStorage.getItem("todo")
  ? []
  : JSON.parse(localStorage.getItem("todo"));
const todoList = new TodoList(todoListElement, taskArray);
todoList.createTaskList();

taskInputElement.addEventListener("change", (e) => {
  todoList.creatTask(e.target.value);
  todoList.createTaskList();
  e.target.value = "";
});

todoListElement.addEventListener("click", (e) => {
  const removeBtn = e.target;
  if (removeBtn.classList.contains("remove-task")) {
    todoList.removeTask(removeBtn.id);
  }
});

// add elements to local storage

function setLocalStorage() {
  //add name
  setLS("name", name);
  //add city
  setLS("city", cityInput);
  updateState();
  todoList.setToDoListToLocalStorage();
}

window.addEventListener("beforeunload", setLocalStorage);

// get elements from local storage

function getLocalStorage() {
  //get name
  getLS("name", name);
  //get city
  getLS("city", cityInput);
  //get lang
  if (localStorage.getItem("lang"))
    languageBtn.textContent = localStorage.getItem("lang");

  todoList.taskArray = JSON.parse(localStorage.getItem("todo"));
}

window.addEventListener("load", getLocalStorage);
